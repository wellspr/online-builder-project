import { FC, useRef, useState } from "react";
import { BuildContext } from "./BuildContext";

interface BuildProviderProps {
    children: React.ReactNode;
}

export const BuildProvider: FC<BuildProviderProps> = ({ children }) => {

    const outputRef = useRef<HTMLIFrameElement | null>(null);
    const [outputCode, setOutputCode] = useState<string | null>(null);

    return (
        <BuildContext.Provider value={{ outputRef, outputCode, setOutputCode }}>
            { children }
        </BuildContext.Provider>
    );
};