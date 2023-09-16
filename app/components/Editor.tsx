// React
import { FC, useEffect, useRef, useState } from "react";

// Esbuild
import { useBuilder } from "~/esbuild-context/BuildContext";

// Monaco Editor
import { Editor as MonacoEditor } from "@monaco-editor/react";
import type { OnMount, OnChange, Monaco } from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";

// Locals
import { apiHandler } from "~/apiHandler";
import defaultCode from "~/config/defaultCode";
import EditorLoader from "./EditorLoader";

const Editor: FC = () => {

    const monacoRef = useRef<Monaco>();
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    const { outputRef, setOutputCode, setLoadingCode, loadingCode } = useBuilder();
    const [inputCode, setInputCode] = useState<string | undefined>(defaultCode);
    const [err, setErr] = useState<string | null>(null);

    const onClickTest = () => {
        console.log(monacoRef.current, editorRef.current);
    };

    const buildCode = () => {
        if (inputCode) {
            setLoadingCode(true);
            apiHandler.build(inputCode)
                .then(r => {
                    console.log("BUILD RESPONSE: ", r.data);
                    setOutputCode(r.data.outputFiles[0].text);
                    if (outputRef && outputRef.current && outputRef.current.contentWindow) {
                        outputRef.current.contentWindow.postMessage(r.data.outputFiles[0].text, "*");
                    }
                })
                .catch(err => setErr(err))
                .finally(() => setLoadingCode(false));
                
        }
    };

    const onMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: monaco.languages.typescript.JsxEmit.React,
            jsxFactory: "React.createElement",
            reactNamespace: "React",
            allowJs: true,
            typeRoots: ["node_modules/@types"],            
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
        });

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
            '<<react-definition-file>>',
            `file:///node_modules/@react/types/index.d.ts`
        );
    };

    const onChange: OnChange = (value, event) => {
        setInputCode(value);
    };

    const options: monaco.editor.IStandaloneEditorConstructionOptions = {
        extraEditorClassName: "custom-monaco-editor",
        minimap: { enabled: false },
        //fontFamily: 
        fontSize: 12,
        lineHeight: 1.6,
        parameterHints: { enabled: true },
        scrollBeyondLastLine: false,
        showUnused: true,
        wordWrap: "on",
        folding: false,
        lineNumbersMinChars: 3,
        automaticLayout: true,
    };

    useEffect(() => { err && console.log(err) }, [err]);

    return (
        <section className="editor" onSubmit={e => e.preventDefault()}>
            <div className="buttons">
                <button
                    className="button"
                    type="button"
                    onClick={buildCode}
                >Run</button>
            </div>
            <div className="monaco-editor-wrapper">
                <MonacoEditor
                    language="typescript"
                    defaultValue={inputCode}
                    onChange={onChange}
                    onMount={onMount}
                    options={options}
                    loading={<EditorLoader />}
                />
            </div>
        </section>
    );
};

export default Editor;