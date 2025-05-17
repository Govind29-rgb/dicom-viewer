import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { cornerstone, cornerstoneWADOImageLoader, cornerstoneTools, initCornerstoneTools } from "./cornerstoneSetup";

const TOOL_NAMES = [
  "Wwwc",
  "Zoom",
  "Pan",
  "Length",
  "FreehandRoi"
];

const DicomImage = forwardRef(({ file, tool, annotationsVisible }, ref) => {
  const divRef = useRef();
  const imageIdRef = useRef(null);
  const annotationBackup = useRef(null);
  const currentTool = useRef(null);

  useImperativeHandle(ref, () => ({
    saveCanvasAsImage,
    rotateViewport,
    invertViewport,
    resetViewport,
  }));

  useEffect(() => {
    initCornerstoneTools();

    if (!file) return;

    const element = divRef.current;
    cornerstone.enable(element);

    let isMounted = true;
    const imageUrl = URL.createObjectURL(file);
    imageIdRef.current = `wadouri:${imageUrl}`;

    cornerstone.loadImage(imageIdRef.current)
      .then(image => {
        if (!isMounted) return;
        cornerstone.displayImage(element, image);

        if (!element.toolsAdded) {
          TOOL_NAMES.forEach(toolName => {
            if (toolName === "FreehandRoi") {
              cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool, {
                configuration: {
                  renderCursor: true,
                  drawHandles: true,
                  drawHandlesOnHover: true,
                }
              });
            } else {
              cornerstoneTools.addTool(cornerstoneTools[`${toolName}Tool`]);
            }
          });
          element.toolsAdded = true;
        }

        cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
      })
      .catch(err => {
        console.error("DICOM load error:", err);
        alert("Could not load DICOM image. Try another file.");
      });

    return () => {
      isMounted = false;
      if (element) {
        try {
          cornerstoneTools.globalImageIdSpecificToolStateManager.clear(element);
          cornerstoneTools.deregisterAllToolsForElement(element);
        } catch (e) {}
        cornerstone.disable(element);
      }
      URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  useEffect(() => {
    const element = divRef.current;
    if (!element || !file) return;

    if (currentTool.current) {
      try {
        cornerstoneTools.setToolDisabled(currentTool.current, { mouseButtonMask: 1 });
      } catch {}
    }

    if (TOOL_NAMES.includes(tool)) {
      try {
        cornerstoneTools.setToolActive(tool, { mouseButtonMask: 1 });
        currentTool.current = tool;
      } catch (e) {
        console.error("Error activating tool:", tool, e);
      }
    }

    cornerstone.updateImage(element);
  }, [tool, file]);

  // Robust annotation visibility toggle (per image)
  useEffect(() => {
    const element = divRef.current;
    if (!element || !file) return;

    const imageId = imageIdRef.current;
    if (!imageId) return;

    const toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;

    if (!annotationsVisible) {
      // Backup only the current imageId's tool state
      const currentToolState = toolStateManager.saveToolState();
      annotationBackup.current = currentToolState[imageId]
        ? { [imageId]: currentToolState[imageId] }
        : null;
      toolStateManager.clear(element);
      cornerstone.updateImage(element);
    } else {
      // Restore only if backup exists
      if (annotationBackup.current && annotationBackup.current[imageId]) {
        const restoredState = { [imageId]: annotationBackup.current[imageId] };
        toolStateManager.restoreToolState(restoredState);
        cornerstone.updateImage(element);
      }
    }
  }, [annotationsVisible, file]);

  function rotateViewport() {
    const element = divRef.current;
    if (!element) return;
    const viewport = cornerstone.getViewport(element);
    viewport.rotation = (viewport.rotation + 90) % 360;
    cornerstone.setViewport(element, viewport);
    cornerstone.updateImage(element);
  }

  function invertViewport() {
    const element = divRef.current;
    if (!element) return;
    const viewport = cornerstone.getViewport(element);
    viewport.invert = !viewport.invert;
    cornerstone.setViewport(element, viewport);
    cornerstone.updateImage(element);
  }

  function resetViewport() {
    const element = divRef.current;
    if (!element) return;
    const viewport = cornerstone.getViewport(element);
    viewport.scale = 1;
    viewport.rotation = 0;
    viewport.invert = false;
    viewport.hflip = false;
    viewport.vflip = false;
    cornerstone.setViewport(element, viewport);
    cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    cornerstone.updateImage(element);
  }

  function saveCanvasAsImage() {
    const element = divRef.current;
    if (!element) return;
    const canvas = element.querySelector("canvas");
    if (!canvas) {
      alert("No image to save!");
      return;
    }
    const link = document.createElement("a");
    link.download = "dicom-annotation.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div
      ref={divRef}
      style={{
        width: 900,
        height: 900,
        background: "#222",
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 2px 16px #0008"
      }}
    />
  );
});

export default DicomImage;
