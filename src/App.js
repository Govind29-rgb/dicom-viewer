import React, { useState } from "react";
import DicomImage from "./DicomImage";

function App() {
  const [file, setFile] = useState(null);
  const [tool, setTool] = useState("reset");

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".dcm")) {
      setFile(selectedFile);
    } else {
      alert("Please upload a .dcm (DICOM) file.");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>DICOM Viewer</h2>
      <input type="file" accept=".dcm" onChange={handleFileChange} />
      {file && (
        <>
          <div style={{ margin: "1rem 0" }}>
            <button onClick={() => setTool("zoomIn")}>Zoom In</button>
            <button onClick={() => setTool("zoomOut")}>Zoom Out</button>
            <button onClick={() => setTool("invert")}>Invert Colors</button>
            <button onClick={() => setTool("reset")}>Reset</button>
          </div>
          <DicomImage file={file} tool={tool} />
        </>
      )}
    </div>
  );
}

export default App;
