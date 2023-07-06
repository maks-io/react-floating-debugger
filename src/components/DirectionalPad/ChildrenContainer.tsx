import React, { ReactNode, useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";

export const ChildrenContainer = ({ children }: { children: ReactNode }) => {
  const { bgColor, borderRadius } = useContext(SettingsContext);
  const { size } = useContext(InfoSettingsContext);
  const usedBackgroundColor =
    typeof bgColor === "string" ? bgColor : bgColor(size);
  return (
    <div
      className="no-scrollbar"
      style={{
        flex: 1,
        backgroundColor: usedBackgroundColor,
        borderRadius: size === "MINIMIZED" ? borderRadius : undefined,
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  );
};
