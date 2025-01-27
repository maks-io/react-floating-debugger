import React, { JSX, useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";

export const IconCornerSVG = ({ degrees, isHovered }): JSX.Element => {
  const {
    iconSize,
    cornerIconColor,
    cornerIconColorHovered,
    cornerIconOpacityHovered,
    cornerIconOpacity,
  } = useContext(SettingsContext);
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 490 490"
      style={{
        transition: "all 0.5s",
        transform: `rotate(${degrees}deg)`,
        opacity: isHovered ? cornerIconOpacityHovered : cornerIconOpacity,
      }}
      fill={isHovered ? cornerIconColorHovered : cornerIconColor}
    >
      <g>
        <path d="M245,0C109.7,0 0,109.7 0,245C0,380.3 109.7,490 245,490C380.3,490 490,380.3 490,245C490,109.7 380.3,0 245,0ZM260.858,160.924L160.85,260.901L60.863,160.924L160.85,61.004L260.858,160.924Z" />
      </g>
    </svg>
  );
};
