import Loader from "~/images/Loader";

const EditorLoader = () => {

    return (
        <div className="editor-loading">
            <Loader />
            <p>Loading Editor...</p>
        </div>
    );
};

export default EditorLoader;