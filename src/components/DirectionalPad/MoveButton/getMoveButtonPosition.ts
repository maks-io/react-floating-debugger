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
    top: position.includes("TOP") ? -externalMoveButtonOffset : undefined,
    left: position.includes("LEFT") ? -externalMoveButtonOffset : undefined,
    bottom: position.includes("BOTTOM") ? -externalMoveButtonOffset : undefined,
    right: position.includes("RIGHT") ? -externalMoveButtonOffset : undefined,
  };
};
