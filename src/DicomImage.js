import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { cornerstone, cornerstoneWADOImageLoader, cornerstoneTools, initCornerstoneTools } from "./cornerstoneSetup";

const DicomImage = forwardRef(({ file, tool, annotationsVisible }, ref) => {
  const divRef = useRef();
  const toolStateBackup = useRef(null);

  useImperativeHandle(ref, () => ({
    saveCanvasAsImage,
    toggleAnnotations
  }));

  useEffect(() => {
    initCornerstoneTools();

    if (!file) return;

    const element = divRef.current;
    cornerstone.enable(element);

    const imageUrl = URL.createObjectURL(file);
    const imageId = `wadouri:${imageUrl}`;

    cornerstone.loadImage(imageId)
      .then(image => {
        cornerstone.displayImage(element, image);

        if (!element.toolsAdded) {
          cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
          cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
          cornerstoneTools.addTool(cornerstoneTools.PanTool);
          cornerstoneTools.addTool(cornerstoneTools.LengthTool);
          cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
          element.toolsAdded = true;
        }

        cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
      })
      .catch(err => {
        alert("Could not load DICOM image. Try another file.");
        console.error(err);
      });

    return () => {
      cornerstone.disable(element);
      URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  // Handle tool switching and viewport changes
  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    // Disable all mouse tools first
    ["Wwwc", "Zoom", "Pan", "Length", "FreehandRoi"].forEach(t => {
      try { cornerstoneTools.setToolDisabled(t, {}); } catch {}
    });

    // Activate the selected mouse tool
    if (tool === "Wwwc") {
      cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    } else if (tool === "Zoom") {
      cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
    } else if (tool === "Pan") {
      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
    } else if (tool === "Length") {
      cornerstoneTools.setToolActive("Length", { mouseButtonMask: 1 });
    } else if (tool === "FreehandRoi") {
      cornerstoneTools.setToolActive("FreehandRoi", { mouseButtonMask: 1 });
    }

    // Handle viewport operations
    const enabledElement = cornerstone.getEnabledElement(element);
    if (!enabledElement || !enabledElement.image) return;
    const viewport = cornerstone.getViewport(element);

    if (tool === "Invert") {
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(element, viewport);
    }
    if (tool === "FlipH") {
      viewport.hflip = !viewport.hflip;
      cornerstone.setViewport(element, viewport);
    }
    if (tool === "FlipV") {
      viewport.vflip = !viewport.vflip;
      cornerstone.setViewport(element, viewport);
    }
    if (tool === "Rotate") {
      viewport.rotation = (viewport.rotation + 90) % 360;
      cornerstone.setViewport(element, viewport);
    }
    if (tool === "Reset") {
      viewport.scale = 1;
      viewport.rotation = 0;
      viewport.invert = false;
      viewport.hflip = false;
      viewport.vflip = false;
      cornerstone.setViewport(element, viewport);
      cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    }
  }, [tool]);

  // Annotation visibility toggle
  useEffect(() => {
    const element = divRef.current;
    if (!element) return;
    const imageId = cornerstone.getEnabledElement(element)?.image?.imageId;
    if (!imageId) return;

    const toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;

    if (!annotationsVisible) {
      // Backup and clear all annotations
      toolStateBackup.current = toolStateManager.saveToolState();
      toolStateManager.clear(element);
      cornerstone.updateImage(element);
    } else if (toolStateBackup.current) {
      // Restore annotations
      toolStateManager.restoreToolState(toolStateBackup.current);
      cornerstone.updateImage(element);
      toolStateBackup.current = null;
    }
  }, [annotationsVisible]);

  // Save as image
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

  // Toggle annotations (handled by useEffect above)
  function toggleAnnotations() {
    // No-op, handled by parent state
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
