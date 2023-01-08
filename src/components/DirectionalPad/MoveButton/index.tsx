import React, { useContext, useEffect, useState } from "react";
import { getIconTooltip } from "$/components/DirectionalPad/MoveButton/getIconTooltip";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";
import { IInfoPosition } from "../../IInfoPosition";
import { isArrowButtonHidden } from "./isArrowButtonHidden";
import { getTargetPosition } from "./getTargetPosition";
import { IArrowPosition } from "../IArrowPosition";
import { Icon } from "./Icon";

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

  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [currentSize]);

  if (currentSize === "MINIMIZED") {
    return null;
  }

  const isMinimizeButton = currentPosition === position;

  return (
    <div
      title={getIconTooltip(currentSize, isMinimizeButton)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentSize === "MAXIMIZED") {
          unmaximize(position as IInfoPosition); // casting in that case is okay
        } else if (currentSize === "IN_CORNER") {
          if (currentPosition === position) {
            minimize();
          } else {
            const targetPosition: IInfoPosition = getTargetPosition(
              position,
              currentPosition
            );
            moveTo(targetPosition);
          }
        } else {
          // do nothing (buttons don't exist for size MINIMIZED)
        }
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
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
