import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import App from "~/components/Homepage";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Esbuild App" },
        { name: "description", content: "This is a esbuild app" },
    ];
};

export default function Index() {
    return (
        <App />
    );
};