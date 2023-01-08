import React, { useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";

export const IconArrowSVG = ({ degrees, isHovered }): JSX.Element => {
  const {
    iconSize,
    arrowIconColor,
    arrowIconColorHovered,
    arrowIconOpacity,
    arrowIconOpacityHovered,
  } = useContext(SettingsContext);
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 490 490"
      style={{
        transition: "all 0.5s",
        transform: `rotate(${degrees}deg)`,
        opacity: isHovered ? arrowIconOpacityHovered : arrowIconOpacity,
      }}
      fill={isHovered ? arrowIconColorHovered : arrowIconColor}
    >
      <g>
        <path d="M245,0C109.7,0 0,109.7 0,245C0,380.3 109.7,490 245,490C380.3,490 490,380.3 490,245C490,109.7 380.3,0 245,0ZM357.7,245L180.88,421.82L181.8,335.5L272.3,245L181.8,154.5L182.099,69.399L357.7,245Z" />
      </g>
    </svg>
  );
};
