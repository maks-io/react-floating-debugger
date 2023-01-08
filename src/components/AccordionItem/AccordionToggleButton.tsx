import React from "react";
import { Icon } from "$/components/DirectionalPad/MoveButton/Icon";

export const AccordionToggleButton = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}): JSX.Element => {
  const toggleButtonTooltip = isOpen
    ? "Click to close section..."
    : "Click to open section...";

  return (
    <div
      title={toggleButtonTooltip}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(!isOpen);
      }}
      style={{ cursor: "pointer" }}
    >
      <Icon
        currentSize={"IN_CORNER"}
        fillColor={"black"}
        degrees={!isOpen ? 90 : 270}
        isHovered={false}
        isHidden={false}
        isMinimizeButton={false}
      />
    </div>
  );
};
