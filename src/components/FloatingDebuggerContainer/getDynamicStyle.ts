import { IInfoPosition } from "$/components/IInfoPosition";
import { IInfoSize } from "$/components/IInfoSize";

export const getDynamicStyle = (
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
