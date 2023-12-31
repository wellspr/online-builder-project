import { useBuilder } from "~/esbuild-context/BuildContext";
import Loader from "~/images/Loader";

const doc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IFrame</title>
        <style>
            body {
                color: white;
            }
        </style>        
    </head>
    <body>
        <div id="root"></div>
        <script>
            const onMessage = (event) => { 
                eval(event.data) 
            };
            window.addEventListener("message", onMessage, false);
        </script>
    </body>
    </html>`;

const Output = () => {

    const { outputRef, loadingCode } = useBuilder();

    return (
        <section className="output">
            {
                loadingCode && 
                <div className="loading-code">
                    <Loader />
                </div>
            }
            <iframe
                ref={outputRef}
                className="iframe"
                srcDoc={doc}
                sandbox="allow-scripts"
                title="IFrame"
            ></iframe>
        </section>
    );
};

export default Output;