import React, { ReactNode, useContext } from "react";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";
import { HoverContext } from "$/contexts/HoverContext";

export const DirectionalPadContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { size } = useContext(InfoSettingsContext);
  const { setLabelHovered } = useContext(HoverContext);

  const containerTooltip =
    size === "MINIMIZED" ? "Click to enlarge..." : "Click to maximize...";

  return (
    <div
      id={"directional-pad-container"}
      title={containerTooltip}
      onMouseEnter={() => {
        setLabelHovered(true);
      }}
      onMouseLeave={() => {
        setLabelHovered(false);
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        cursor: size === "MAXIMIZED" ? "auto" : "pointer",
      }}
    >
      {children}
    </div>
  );
};
