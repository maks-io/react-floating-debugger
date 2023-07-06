import React, { ReactNode, useContext } from "react";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";

export const HorizontalPadButtonContainer = ({
  children,
  isMiddleRow = false,
}: {
  children: ReactNode;
  isMiddleRow?: boolean;
}) => {
  const { position, size } = useContext(InfoSettingsContext);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems:
          size === "MINIMIZED" && position.includes("TOP")
            ? "flex-end"
            : size === "MINIMIZED" && position.includes("BOTTOM")
            ? "flex-start"
            : undefined,
        justifyContent:
          size === "MINIMIZED" && position.includes("LEFT")
            ? "flex-end"
            : size === "MINIMIZED" && position.includes("RIGHT")
            ? "flex-start"
            : "space-between",
        minHeight: 0,
        flex: isMiddleRow ? 1 : undefined,
      }}
    >
      {children}
    </div>
  );
};
