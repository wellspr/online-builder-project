import { useContext } from "react";
import { createContext } from "react";

export type BuildContextProps = {
    outputRef: React.RefObject<HTMLIFrameElement> | null,
    outputCode: string | null,
    setOutputCode: React.Dispatch<React.SetStateAction<string | null>>,
}

const defaultValue: BuildContextProps = {
    outputRef: null,
    outputCode: null,
    setOutputCode: () => {},
};

export const BuildContext = createContext<BuildContextProps>(defaultValue);
export const useBuilder = () => useContext<BuildContextProps>(BuildContext);