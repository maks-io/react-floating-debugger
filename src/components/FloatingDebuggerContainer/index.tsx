import React, { ReactNode, useContext } from "react";
import { SettingsContext } from "$/contexts/SettingsContext";
import { InfoSettingsContext } from "$/contexts/InfoSettingsContext";
import { getDynamicStyle } from "$/components/FloatingDebuggerContainer/getDynamicStyle";

export const FloatingDebuggerContainer = ({
  textColor,
  children,
  onClick,
}: {
  textColor: string;
  children: ReactNode;
  onClick: () => void;
}) => {
  const {
    screenWidth,
    zIndex,
    bgColor,
    borderRadius,
    borderWidth,
    borderStyle,
    borderColor,
    inCornerContainerScale,
    minimizedContainerScale,
    transformScale,
    inCornerOffset,
    maximizedOffset,
  } = useContext(SettingsContext);
  const { size, position } = useContext(InfoSettingsContext);
  const usedBackgroundColor =
    typeof bgColor === "string" ? bgColor : bgColor(size);

  const usedInCornerOffset = inCornerOffset * transformScale;
  const usedMaximizedOffset = maximizedOffset * transformScale;

  const dynamicStyle = getDynamicStyle(
    screenWidth,
    position,
    size,
    inCornerContainerScale,
    minimizedContainerScale,
    usedMaximizedOffset,
    usedInCornerOffset
  );

  return (
    <div
      style={{
        zIndex,
        top: 0,
        left: 0,
        position: "fixed",
        color: textColor,
        backgroundColor: usedBackgroundColor,
        fontSize: 12,
        borderRadius,
        borderWidth,
        borderStyle,
        borderColor,
        display: "flex",
        flexDirection: "row",
        transition: "all 0.4s",
        alignItems: "center",
        justifyContent: "center",
        ...dynamicStyle,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
