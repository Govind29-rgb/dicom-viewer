import React, { useState, useRef } from "react";
import DicomImage from "./DicomImage";
import {
  FaArrowsAlt, FaRuler, FaPencilAlt, FaSun, FaSync, FaUndo, FaExpandArrowsAlt, FaEye, FaEyeSlash, FaSave
} from "react-icons/fa";

function App() {
  const [file, setFile] = useState(null);
  const [tool, setTool] = useState("Wwwc");
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  const dicomRef = useRef();

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".dcm")) {
      setFile(selectedFile);
    } else {
      alert("Please upload a .dcm (DICOM) file.");
    }
  }

  function handleSaveImage() {
    if (dicomRef.current) {
      dicomRef.current.saveCanvasAsImage();
    }
  }

  function handleToggleAnnotations() {
    if (dicomRef.current) {
      dicomRef.current.toggleAnnotations();
      setAnnotationsVisible((v) => !v);
    }
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#18181b"
    }}>
      {/* Main Viewer Area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}>
        <div style={{ position: "absolute", top: 24, left: 24 }}>
          <input type="file" accept=".dcm" onChange={handleFileChange} style={{ color: "#fff" }} />
        </div>
        {file &&
          <DicomImage
            ref={dicomRef}
            file={file}
            tool={tool}
            annotationsVisible={annotationsVisible}
          />
        }
        {/* Legend Box */}
        <div style={{
          position: "absolute",
          bottom: 30,
          right: 90,
          background: "#18181b",
          color: "#fff",
          borderRadius: 8,
          padding: "1rem 1.5rem",
          boxShadow: "0 2px 12px #0005",
          minWidth: 220
        }}>
          <b>Tooth Parts</b>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 8 }}>
            <Legend color="#f6c66a" label="Bone" />
            <Legend color="#f5f5f5" label="Enamel" />
            <Legend color="#7fffd4" label="Dentin" />
            <Legend color="#c7a4ff" label="Pulp" />
            <Legend color="#b0c4de" label="Cementum" />
            <Legend color="#ffb6b6" label="Restoration" />
          </div>
        </div>
      </div>
      {/* Vertical Icon Sidebar (Right) */}
      <div style={{
        width: 60,
        background: "#23232b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        gap: 18,
        borderLeft: "2px solid #1f1f24"
      }}>
        <SidebarIcon icon={<FaSun />} label="Brightness/Contrast" onClick={() => setTool("Wwwc")} />
        <SidebarIcon icon={<FaRuler />} label="Measure Length" onClick={() => setTool("Length")} />
        <SidebarIcon icon={<FaPencilAlt />} label="Freehand Draw" onClick={() => setTool("FreehandRoi")} />
        <SidebarIcon icon={<FaExpandArrowsAlt />} label="Pan" onClick={() => setTool("Pan")} />
        <SidebarIcon icon={<FaArrowsAlt />} label="Flip Horizontal" onClick={() => setTool("FlipH")} />
        <SidebarIcon icon={<FaSync />} label="Rotate 90°" onClick={() => setTool("Rotate")} />
        <SidebarIcon icon={<FaUndo />} label="Invert" onClick={() => setTool("Invert")} />
        <SidebarIcon icon={<FaEye />} label="Show/Hide Annotations" onClick={handleToggleAnnotations} />
        <SidebarIcon icon={<FaSave />} label="Save as Image" onClick={handleSaveImage} />
        <SidebarIcon icon={<FaUndo />} label="Reset" onClick={() => setTool("Reset")} />
      </div>
    </div>
  );
}

function SidebarIcon({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: 26,
        margin: "8px 0",
        cursor: "pointer",
        outline: "none"
      }}
    >
      {icon}
    </button>
  );
}

function Legend({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: 14, marginBottom: 5 }}>
      <span style={{
        width: 18, height: 18, background: color,
        display: "inline-block", borderRadius: 4, marginRight: 6, border: "1px solid #444"
      }} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

export default App;
