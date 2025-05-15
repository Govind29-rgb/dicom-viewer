import React, { useEffect, useRef } from "react";
import { cornerstone, cornerstoneWADOImageLoader, cornerstoneTools, initCornerstoneTools } from "./cornerstoneSetup";

export default function DicomImage({ file, tool }) {
  const divRef = useRef();

  // Initialize and load image
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

        // Add tools once per element
        if (!element.toolsAdded) {
          cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
          cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
          cornerstoneTools.addTool(cornerstoneTools.PanTool);
          cornerstoneTools.addTool(cornerstoneTools.LengthTool);
          cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
          element.toolsAdded = true;
        }

        // Set default tool
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
      // Reset tool to window/level after reset
      cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 });
    }
  }, [tool]);

  return (
    <div
      ref={divRef}
      style={{
        width: 512,
        height: 512,
        background: "#222",
        marginTop: "1rem"
      }}
    />
  );
}
