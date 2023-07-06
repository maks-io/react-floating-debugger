import { IInfoSize } from "$/components/IInfoSize";
import { IArrowPosition } from "$/components/DirectionalPad/IArrowPosition";

export const externalMoveButtonOffset = 25;

export const getMoveButtonPosition = (
  currentSize: IInfoSize,
  position: IArrowPosition
): object => {
  if (currentSize !== "MINIMIZED") {
    return {};
  }
  return {
    position: "absolute",
    top: position.includes("TOP") ? -externalMoveButtonOffset : "auto",
    left: position.includes("LEFT") ? -externalMoveButtonOffset : "auto",
    bottom: position.includes("BOTTOM") ? -externalMoveButtonOffset : "auto",
    right: position.includes("RIGHT") ? -externalMoveButtonOffset : "auto",
  };
};
