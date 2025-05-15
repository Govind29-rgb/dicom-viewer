// src/cornerstoneSetup.js
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";

// Set up external dependencies
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;

// Only call this ONCE
let initialized = false;
export function initCornerstoneTools() {
  if (!initialized) {
    cornerstoneTools.init();
    initialized = true;
  }
}

export { cornerstone, cornerstoneWADOImageLoader, cornerstoneTools };
