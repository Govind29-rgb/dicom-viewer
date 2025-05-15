# DICOM Viewer React App

A simple DICOM viewer built with React.

## 🚀 Live Demo

[Add your deployed Netlify/Vercel link here]

## 🛠️ Project Setup

1. **Clone the repository:**
git clone https://github.com/Govind29-rgb/dicom-viewer
cd dicom-viewer


2. **Install dependencies:**
npm install


3. **Start the development server:**
npm start

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build for Production

To create an optimized production build:
npm run build

This will generate a `build` folder containing all the production files.

---

## 🌐 Deploying to Netlify

1. **Ensure a `_redirects` file exists in the `build` folder with the following content:**
2. /* /index.html 200

  
2. **Deploy:**
- **Option 1: Drag-and-drop**
  - Go to [Netlify Drop](https://app.netlify.com/drop)
  - Drag and drop your entire `build` folder.
- **Option 2: Netlify CLI**
  - Install Netlify CLI (if not already):
    ```
    npm install -g netlify-cli
    ```
  - Deploy:
    ```
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

- Make sure you have Node.js and npm installed.
- For client-side routing (React Router), the `_redirects` file is **required** in the `build` folder for Netlify deployments.

---

## 📚 Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Netlify documentation](https://docs.netlify.com/)

---

## License

[MIT](LICENSE)  
*(Or specify your own license)*

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




