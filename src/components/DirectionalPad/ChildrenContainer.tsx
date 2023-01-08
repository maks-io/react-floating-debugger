import React, { ReactNode, useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";

export const ChildrenContainer = ({ children }: { children: ReactNode }) => {
  const { bgColor } = useContext(SettingsContext);
  const { size } = useContext(InfoSettingsContext);
  const usedBackgroundColor =
    typeof bgColor === "string" ? bgColor : bgColor(size);
  return (
    <div
      className="no-scrollbar"
      style={{
        flex: 1,
        backgroundColor: usedBackgroundColor,
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  );
};
