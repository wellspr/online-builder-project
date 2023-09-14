import { FC, useEffect, useState } from "react";
import { apiHandler } from "~/apiHandler";
import { Editor as MonacoEditor } from "@monaco-editor/react"
import defaultCode from "~/config/defaultCode";
import { useBuilder } from "~/esbuild-context/BuildContext";

const Editor: FC = () => {

    const { outputRef } = useBuilder();
    const [inputCode, setInputCode] = useState<string | undefined>(defaultCode);
    const { setOutputCode } = useBuilder();
    const [err, setErr] = useState<string | null>(null);

    const buildCode = () => {
        if (inputCode) {
            apiHandler.build(inputCode)
                .then(r => {
                    console.log("BUILD RESPONSE: ", r.data);
                    setOutputCode(r.data.outputFiles[0].text);
                    if (outputRef && outputRef.current && outputRef.current.contentWindow) {
                        outputRef.current.contentWindow.postMessage(r.data.outputFiles[0].text, "*");
                    }
                })
                .catch(err => setErr(err));
        }
    };

    useEffect(() => {
        if (err) {
            console.log(err);
        }
    }, [err]);

    return (
        <form onSubmit={e => e.preventDefault()}>
            <MonacoEditor
                height="15rem"
                defaultLanguage="javascript"
                defaultValue={inputCode}
                onChange={(value, event) => {
                    setInputCode(value);
                }}
                options={{
                    minimap: {enabled: false}
                }}
            />
            <button
                type="submit"
                onClick={buildCode}
            >Submit</button>
        </form>
    );
};

export default Editor;