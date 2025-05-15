import React, { useState } from "react";
import DicomImage from "./DicomImage";

function App() {
  const [file, setFile] = useState(null);
  const [tool, setTool] = useState("Wwwc"); // Default tool

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".dcm")) {
      setFile(selectedFile);
    } else {
      alert("Please upload a .dcm (DICOM) file.");
    }
  }

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      <div style={{
        width: "200px", background: "#f7f7f7", padding: "1rem", borderRight: "1px solid #ddd"
      }}>
        <h3>Tools</h3>
        <button onClick={() => setTool("Wwwc")}>Brightness/Contrast</button>
        <button onClick={() => setTool("Zoom")}>Zoom</button>
        <button onClick={() => setTool("Pan")}>Pan</button>
        <button onClick={() => setTool("Invert")}>Invert</button>
        <button onClick={() => setTool("FlipH")}>Flip Horizontal</button>
        <button onClick={() => setTool("FlipV")}>Flip Vertical</button>
        <button onClick={() => setTool("Rotate")}>Rotate 90°</button>
        <button onClick={() => setTool("Length")}>Measure Length</button>
        <button onClick={() => setTool("FreehandRoi")}>Freehand Draw</button>
        <button onClick={() => setTool("Reset")}>Reset</button>
      </div>
      <div style={{ flex: 1, padding: "2rem" }}>
        <h2>DICOM Viewer</h2>
        <input type="file" accept=".dcm" onChange={handleFileChange} />
        {file && <DicomImage file={file} tool={tool} />}
      </div>
    </div>
  );
}

export default App;
