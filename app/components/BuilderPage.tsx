import Output from "./Output";
import Editor from "./Editor";
import { BuildProvider } from "~/esbuild-context/BuildProvider";

const BuilderPage = () => {
    return (
        <BuildProvider>
            <div className="builder-area">
                <Editor />
                <Output />
            </div>
        </BuildProvider>
    );
};

export default BuilderPage;