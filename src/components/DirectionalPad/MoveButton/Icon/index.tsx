import React, { useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";
import { IInfoSize } from "../../../IInfoSize";
import { IconArrowSVG } from "./IconArrowSVG";
import { IconCornerSVG } from "./IconCornerSVG";

interface ArrowIconProps {
  currentSize: IInfoSize;
  fillColor: string;
  degrees: number;
  isHovered: boolean;
  isHidden: boolean;
  isMinimizeButton: boolean;
}

export const Icon = ({
  currentSize,
  fillColor,
  degrees,
  isHovered,
  isHidden,
  isMinimizeButton,
}: ArrowIconProps) => {
  const { iconSize } = useContext(SettingsContext);
  return (
    <div
      style={{
        margin: 3,
        height: iconSize,
        width: iconSize,
        opacity: isHidden ? 0 : 0.5,
        pointerEvents: isHidden ? "none" : "auto",
        transition: "all 0.5s",
      }}
    >
      {currentSize === "MAXIMIZED" || isMinimizeButton ? (
        <IconCornerSVG degrees={degrees + 135} isHovered={isHovered} />
      ) : (
        <IconArrowSVG degrees={degrees} isHovered={isHovered} />
      )}
    </div>
  );
};
