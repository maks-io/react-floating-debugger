import { IInfoSize } from "$/components/IInfoSize";

export const getIconTooltip = (
  currentSize: IInfoSize,
  isMinimizeButton: boolean
): string => {
  if (currentSize === "MAXIMIZED") {
    return "Click to downsize...";
  } else if (currentSize === "MINIMIZED") {
    return isMinimizeButton ? "Click to enlarge..." : "Click to move...";
  } else {
    return isMinimizeButton ? "Click to minimize..." : "Click to move...";
  }
};
