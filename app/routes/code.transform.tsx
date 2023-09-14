import { ActionArgs, json } from "@remix-run/node";
import { transform } from "~/esbuild/transform";

export const action = async ({ request }: ActionArgs) => {
    const body = await request.json();
    const code = body.code;
    let result = await transform(code);
    return json(result);
};