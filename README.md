# DICOM Viewer React App

A simple DICOM viewer built with React.

---

## 🚀 Live Demo

[https://lucky-gelato-7c94d3.netlify.app/](https://lucky-gelato-7c94d3.netlify.app/)

## 📦 GitHub Repository

[https://github.com/Govind29-rgb/dicom-viewer](https://github.com/Govind29-rgb/dicom-viewer)

---src/
│
├── App.js                # Main React component, handles layout and tool selection
├── DicomImage.js         # Core DICOM viewer, handles image display, tools, and annotations
├── cornerstoneSetup.js   # Initializes cornerstone and its dependencies
├── index.js              # Entry point, renders App component
├── index.css             # Global styles for the app
├── ...                   # (Other files/components if present)



## 🛠️ Project Setup

1. **Clone the repository:**
    ```
    git clone https://github.com/Govind29-rgb/dicom-viewer.git
    cd dicom-viewer
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Start the development server:**
    ```
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build for Production

To create an optimized production build:
npm run build

This will generate a `build` folder containing all the production files.

---

## 🌐 Deploying to Netlify

1. **Ensure a `_redirects` file exists in the `build` folder with:**
    ```
    /*    /index.html   200
    ```

2. **Deploy:**
    - **Option 1:** Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
    - **Option 2:** Use Netlify CLI:
        ```
        npm install -g netlify-cli
        netlify deploy --prod --dir=build
        ```

---

## 📁 Project Structure

dicom-viewer/
├── public/
├── src/
├── build/ # Created after running npm run build
├── package.json
└── README.md

---

## ℹ️ Additional Information

- Node.js and npm are required.
- For client-side routing (React Router), the `_redirects` file is required in the `build` folder for Netlify deployments.

---

## License

MIT

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

- `npm start`  
  Runs the app in development mode.

- `npm test`  
  Launches the test runner.

- `npm run build`  
  Builds the app for production.

- `npm run eject`  
  Removes the single build dependency from your project.

For more information, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---



