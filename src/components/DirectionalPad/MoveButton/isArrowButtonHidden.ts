import { IInfoPosition } from "../../IInfoPosition";
import { IInfoSize } from "../../IInfoSize";
import { IArrowPosition } from "../IArrowPosition";

export const isArrowButtonHidden = (
  position: IArrowPosition,
  currentPosition: IInfoPosition,
  currentSize: IInfoSize
): boolean => {
  if (currentSize === "MAXIMIZED") {
    return (
      position.includes("CENTER") || position === "LEFT" || position === "RIGHT"
    );
  } else if (currentPosition === "TOP_LEFT") {
    return !["BOTTOM_CENTER", "BOTTOM_RIGHT", "RIGHT", "TOP_LEFT"].includes(
      position
    );
  } else if (currentPosition === "TOP_RIGHT") {
    return !["LEFT", "BOTTOM_LEFT", "BOTTOM_CENTER", "TOP_RIGHT"].includes(
      position
    );
  } else if (currentPosition === "BOTTOM_LEFT") {
    return !["TOP_CENTER", "TOP_RIGHT", "RIGHT", "BOTTOM_LEFT"].includes(
      position
    );
  } else {
    return !["LEFT", "TOP_LEFT", "TOP_CENTER", "BOTTOM_RIGHT"].includes(
      position
    );
  }
};
