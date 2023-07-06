import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { IInfoSize } from "$/components/IInfoSize";
import { IInfoPosition } from "$/components/IInfoPosition";

interface HoverContext {
  areaHovered: boolean;
  setAreaHovered: Dispatch<SetStateAction<boolean>>;
  moveButtonHovered: boolean;
  setMoveButtonHovered: Dispatch<SetStateAction<boolean>>;
  labelHovered: boolean;
  setLabelHovered: Dispatch<SetStateAction<boolean>>;
}

export const HoverContext = createContext<Required<HoverContext>>({
  areaHovered: false,
  setAreaHovered: null,
  moveButtonHovered: false,
  setMoveButtonHovered: null,
  labelHovered: false,
  setLabelHovered: null,
});

export function HoverContextProvider({ children }: { children: ReactNode }) {
  const [areaHovered, setAreaHovered] = useState(false);
  const [moveButtonHovered, setMoveButtonHovered] = useState(false);
  const [labelHovered, setLabelHovered] = useState(false);

  const value: Required<HoverContext> = useMemo(
    () => ({
      areaHovered,
      setAreaHovered,
      moveButtonHovered,
      setMoveButtonHovered,
      labelHovered,
      setLabelHovered,
    }),
    [areaHovered, moveButtonHovered, labelHovered]
  );

  return (
    <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
  );
}
