import { type V2_MetaFunction } from "@remix-run/node";
import BuilderPage from "~/components/BuilderPage";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Esbuild App" },
        { name: "description", content: "This is a esbuild app" },
    ];
};

const Index = () => <BuilderPage />;

export default Index;