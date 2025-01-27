import React, { JSX, useContext, useEffect, useState } from "react";
import { getIconTooltip } from "$/components/DirectionalPad/MoveButton/getIconTooltip";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";
import { IInfoPosition } from "../../IInfoPosition";
import { isArrowButtonHidden } from "./isArrowButtonHidden";
import { getTargetPosition } from "./getTargetPosition";
import { IArrowPosition } from "../IArrowPosition";
import { Icon } from "./Icon";
import { getMoveButtonPosition } from "$/components/DirectionalPad/MoveButton/getMoveButtonPosition";
import { HoverContext } from "$/contexts/HoverContext";

export const MoveButton = ({
  moveTo,
  position,
  degrees,
  unmaximize,
  minimize,
  buttonColor,
}: {
  moveTo: (infoPosition: IInfoPosition) => void;
  position: IArrowPosition;
  degrees: number;
  unmaximize: (position: IInfoPosition) => void;
  minimize: () => void;
  buttonColor: string;
}): JSX.Element => {
  const { position: currentPosition, size: currentSize } =
    useContext(InfoSettingsContext);
  const {
    setMoveButtonHovered,
    setLabelHovered,
    setAreaHovered,
    areaHovered,
    moveButtonHovered,
    labelHovered,
  } = useContext(HoverContext);

  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [currentSize]);

  const isMinimizeButton = currentPosition === position;

  if (currentSize === "MINIMIZED") {
    if (
      isMinimizeButton ||
      (!areaHovered && !moveButtonHovered && !labelHovered)
    )
      return null;
  }

  return (
    <div
      key={`move-button-${position}`}
      title={getIconTooltip(currentSize, isMinimizeButton)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentSize === "MAXIMIZED") {
          unmaximize(position as IInfoPosition); // casting in that case is okay
        } else {
          // currentSize === "MINIMIZED" || currentSize === "IN_CORNER"
          if (currentPosition === position) {
            minimize();
          } else {
            const targetPosition: IInfoPosition = getTargetPosition(
              position,
              currentPosition,
            );
            moveTo(targetPosition);
          }
        }
        setMoveButtonHovered(false);
        setAreaHovered(false);
        setLabelHovered(false);
        if (isHovered) {
          setHovered(false);
        }
      }}
      onMouseEnter={() => {
        setHovered(true);
        setMoveButtonHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setMoveButtonHovered(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...getMoveButtonPosition(currentSize, position),
      }}
    >
      <Icon
        currentSize={currentSize}
        fillColor={buttonColor}
        degrees={degrees}
        isHovered={isHovered}
        isHidden={isArrowButtonHidden(position, currentPosition, currentSize)}
        isMinimizeButton={isMinimizeButton}
      />
    </div>
  );
};
