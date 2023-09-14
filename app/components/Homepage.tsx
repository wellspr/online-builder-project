import cog from "../images/cog.svg";
import Output from "./Output";
import Editor from "./Editor";
import { BuildProvider } from "~/esbuild-context/BuildProvider";

const App = () => {
    return (
        <BuildProvider>
            <div className="home">
                <h1 className="brand">
                    <img className="brand__image" src={cog} alt="logo" height="50px" />
                    <span className="brand__text">Esbuild App</span>
                </h1>
                <div className="editor-area">
                    <Editor />
                    <Output />
                </div>
                {/* 
            <div className="transpiled">
            <pre><code>${code.toString()}</code></pre>
            </div>
            */}
            </div>
        </BuildProvider>
    );
};

export default App;