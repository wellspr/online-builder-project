import { ActionArgs, json } from "@remix-run/node";
import { build } from "~/esbuild/build";

export const action = async ({ request }: ActionArgs) => {
    const body = await request.json();
    const code = body.code;    
    let result = await build(code);
    return json(result);
};