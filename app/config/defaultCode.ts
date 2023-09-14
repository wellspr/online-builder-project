export default 
`import React from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
const App = () => <h1>Hello there!</h1>;
root.render(<App />);`;