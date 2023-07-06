import React, { useContext } from "react";
import { externalMoveButtonOffset } from "$/components/DirectionalPad/MoveButton/getMoveButtonPosition";
import { HoverContext } from "$/contexts/HoverContext";

export const HoverArea = () => {
  const { setAreaHovered, areaHovered, moveButtonHovered, labelHovered } =
    useContext(HoverContext);

  if (!areaHovered && !moveButtonHovered && !labelHovered) {
    return null;
  }

  return (
    <div
      onMouseEnter={() => {
        setAreaHovered(true);
      }}
      onMouseLeave={() => {
        setAreaHovered(false);
      }}
      style={{
        position: "absolute",
        width: `calc(100% + 2 * ${externalMoveButtonOffset}px)`,
        height: `calc(100% + 2 * ${externalMoveButtonOffset}px)`,
        margin: -externalMoveButtonOffset,
      }}
    ></div>
  );
};
