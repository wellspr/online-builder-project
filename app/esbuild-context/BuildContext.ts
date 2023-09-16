import { useContext } from "react";
import { createContext } from "react";

export type BuildContextProps = {
    outputRef: React.RefObject<HTMLIFrameElement> | null;
    outputCode: string | null;
    setOutputCode: React.Dispatch<React.SetStateAction<string | null>>;
    loadingCode: boolean;
    setLoadingCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: BuildContextProps = {
    outputRef: null,
    outputCode: null,
    setOutputCode: () => {},
    loadingCode: false,
    setLoadingCode: () => {},
};

export const BuildContext = createContext<BuildContextProps>(defaultValue);
export const useBuilder = () => useContext<BuildContextProps>(BuildContext);