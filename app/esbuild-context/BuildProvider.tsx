import { FC, useRef, useState } from "react";
import { BuildContext } from "./BuildContext";

interface BuildProviderProps {
    children: React.ReactNode;
}

export const BuildProvider: FC<BuildProviderProps> = ({ children }) => {

    const outputRef = useRef<HTMLIFrameElement | null>(null);
    const [outputCode, setOutputCode] = useState<string | null>(null);
    const [loadingCode, setLoadingCode] = useState<boolean>(false);

    return (
        <BuildContext.Provider value={{ outputRef, outputCode, setOutputCode, loadingCode, setLoadingCode }}>
            { children }
        </BuildContext.Provider>
    );
};