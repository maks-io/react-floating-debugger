import { IInfoPosition } from "../../IInfoPosition";
import { IArrowPosition } from "../IArrowPosition";

export const getTargetPosition = (
  arrowPosition: IArrowPosition,
  currentPosition: IInfoPosition
): IInfoPosition => {
  if (currentPosition === "TOP_LEFT") {
    if (arrowPosition === "RIGHT") {
      return "TOP_RIGHT";
    } else if (arrowPosition === "BOTTOM_RIGHT") {
      return "BOTTOM_RIGHT";
    } else if (arrowPosition === "BOTTOM_CENTER") {
      return "BOTTOM_LEFT";
    }
  } else if (currentPosition === "TOP_RIGHT") {
    if (arrowPosition === "LEFT") {
      return "TOP_LEFT";
    } else if (arrowPosition === "BOTTOM_LEFT") {
      return "BOTTOM_LEFT";
    } else if (arrowPosition === "BOTTOM_CENTER") {
      return "BOTTOM_RIGHT";
    }
  } else if (currentPosition === "BOTTOM_LEFT") {
    if (arrowPosition === "TOP_CENTER") {
      return "TOP_LEFT";
    } else if (arrowPosition === "TOP_RIGHT") {
      return "TOP_RIGHT";
    } else if (arrowPosition === "RIGHT") {
      return "BOTTOM_RIGHT";
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (arrowPosition === "LEFT") {
      return "BOTTOM_LEFT";
    } else if (arrowPosition === "TOP_LEFT") {
      return "TOP_LEFT";
    } else if (arrowPosition === "TOP_CENTER") {
      return "TOP_RIGHT";
    }
  }

  return "TOP_LEFT"; // fallback value (should not be reachable)
};
