import axios from "axios";

const transform = async (code: string) => {
    return await axios.post("/code/transform", { code });
};

const build = async (code: string) => {
    return await axios.post("/code/build", { code });
};

export const apiHandler = { transform, build };