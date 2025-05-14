import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

export default function DicomImage({ file, tool }) {
  const divRef = useRef();
  const imageIdRef = useRef();

  useEffect(() => {
    if (!file) return;

    const element = divRef.current;
    cornerstone.enable(element);

    const imageUrl = URL.createObjectURL(file);
    const imageId = `wadouri:${imageUrl}`;
    imageIdRef.current = imageId;

    cornerstone.loadImage(imageId).then(image => {
      cornerstone.displayImage(element, image);

      // Set default viewport after image is displayed
      const viewport = cornerstone.getViewport(element);
      if (viewport) {
        viewport.scale = 1;
        viewport.invert = false;
        cornerstone.setViewport(element, viewport);
      }
    });

    return () => {
      cornerstone.disable(element);
      URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  // Only update viewport if image is loaded and element is enabled
  useEffect(() => {
    const element = divRef.current;
    if (!element) return;
    const enabledElement = cornerstone.getEnabledElement(element);
    if (!enabledElement || !enabledElement.image) return; // <--- this is the key fix

    const viewport = cornerstone.getViewport(element);

    if (tool === "zoomIn") {
      viewport.scale *= 1.2;
      cornerstone.setViewport(element, viewport);
    } else if (tool === "zoomOut") {
      viewport.scale /= 1.2;
      cornerstone.setViewport(element, viewport);
    } else if (tool === "invert") {
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(element, viewport);
    } else if (tool === "reset") {
      viewport.scale = 1;
      viewport.invert = false;
      cornerstone.setViewport(element, viewport);
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
