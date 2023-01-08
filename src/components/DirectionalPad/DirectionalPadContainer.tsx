import React, { ReactNode, useContext } from "react";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";

export const DirectionalPadContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { size } = useContext(InfoSettingsContext);

  const containerTooltip = "Click to maximize...";
  return (
    <div
      title={containerTooltip}
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
