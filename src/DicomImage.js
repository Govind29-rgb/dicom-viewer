import React, { useEffect, useRef } from "react";
import { cornerstone, cornerstoneWADOImageLoader, cornerstoneTools, initCornerstoneTools } from "./cornerstoneSetup";

export default function DicomImage({ file, tool }) {
  const divRef = useRef();

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

  // ... (tool switching code remains unchanged)

  return (
    <div
      ref={divRef}
      style={{
        width: 900,            // <--- Make this as big as you want!
        height: 900,           // <--- Make this as big as you want!
        background: "#222",
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 2px 16px #0008"
      }}
    />
  );
}
