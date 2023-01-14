import React, { ReactNode, useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";
import { IInfoPosition } from "./IInfoPosition";
import { IInfoSize } from "./IInfoSize";

export const FloatingDebuggerContainer = ({
  textColor,
  children,
  onClick,
}: {
  textColor: string;
  children: ReactNode;
  onClick: () => void;
}) => {
  const {
    screenWidth,
    zIndex,
    bgColor,
    borderRadius,
    borderWidth,
    borderStyle,
    borderColor,
    inCornerContainerScale,
    minimizedContainerScale,
    transformScale,
    inCornerOffset,
    maximizedOffset,
  } = useContext(SettingsContext);
  const { size, position } = useContext(InfoSettingsContext);
  const usedBackgroundColor =
    typeof bgColor === "string" ? bgColor : bgColor(size);

  const usedInCornerOffset = inCornerOffset * transformScale;
  const usedMaximizedOffset = maximizedOffset * transformScale;

  const dynamicStyle = getDynamicStyle(
    screenWidth,
    position,
    size,
    inCornerContainerScale,
    minimizedContainerScale,
    usedMaximizedOffset,
    usedInCornerOffset
  );

  return (
    <div
      style={{
        overflow: "hidden",
        zIndex,
        top: 0,
        left: 0,
        position: "fixed",
        color: textColor,
        backgroundColor: usedBackgroundColor,
        fontSize: 12,
        borderRadius,
        borderWidth,
        borderStyle,
        borderColor,
        display: "flex",
        flexDirection: "row",
        transition: "all 0.4s",
        alignItems: "center",
        justifyContent: "center",
        ...dynamicStyle,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const getDynamicStyle = (
  screenWidth: string,
  position: IInfoPosition,
  size: IInfoSize,
  inCornerScale: number,
  minimizedScale: number,
  maximizedOffset: number,
  inCornerOffset: number
): {
  width?: string;
  maxWidth?: string;
  height?: string;
  transform?: string;
  transformOrigin?: string;
} => {
  if (size === "MAXIMIZED") {
    return {
      width: `calc(${screenWidth} - ${2 * maximizedOffset}px)`,
      height: `calc(100vh - ${2 * maximizedOffset}px)`,
      transform: `translate(${maximizedOffset}px, ${maximizedOffset}px)`,
      transformOrigin: "top left",
    };
  } else if (size === "IN_CORNER") {
    const maxWidth = `calc(100vw - ${inCornerOffset * 2}px)`;
    if (position === "TOP_LEFT") {
      return {
        maxWidth,
        transform: `translate(${inCornerOffset}px, ${inCornerOffset}px) scale(${inCornerScale})`,
        transformOrigin: "top left",
      };
    } else if (position === "TOP_RIGHT") {
      return {
        maxWidth,
        transform: `translate(calc(${screenWidth} - 100% - ${inCornerOffset}px), ${inCornerOffset}px) scale(${inCornerScale})`,
        transformOrigin: "top right",
      };
    } else if (position === "BOTTOM_LEFT") {
      return {
        maxWidth,
        transform: `translate(${inCornerOffset}px, calc(100vh - 100% - ${inCornerOffset}px)) scale(${inCornerScale})`,
        transformOrigin: "bottom left",
      };
    } else {
      return {
        maxWidth,
        transform: `translate(calc(${screenWidth} - 100% - ${inCornerOffset}px), calc(100vh - 100% - ${inCornerOffset}px)) scale(${inCornerScale})`,
        transformOrigin: "bottom left",
      };
    }
  } else {
    // size === "MINIMIZED"
    if (position === "TOP_LEFT") {
      return {
        transform: `translate(${inCornerOffset}px, ${inCornerOffset}px) scale(${minimizedScale})`,
        transformOrigin: "top left",
      };
    } else if (position === "TOP_RIGHT") {
      return {
        transform: `translate(calc(${screenWidth} - 100% - ${inCornerOffset}px), ${inCornerOffset}px) scale(${minimizedScale})`,
        transformOrigin: "top right",
      };
    } else if (position === "BOTTOM_LEFT") {
      return {
        transform: `translate(${inCornerOffset}px, calc(100vh - 100% - ${inCornerOffset}px)) scale(${minimizedScale})`,
        transformOrigin: "bottom left",
      };
    } else {
      return {
        transform: `translate(calc(${screenWidth} - 100% - ${inCornerOffset}px), calc(100vh - 100% - ${inCornerOffset}px)) scale(${minimizedScale})`,
        transformOrigin: "bottom left",
      };
    }
  }
};
