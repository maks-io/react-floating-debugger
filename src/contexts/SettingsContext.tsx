import React, { createContext, ReactNode, useMemo } from "react";
import { IInfoSize } from "$/components/IInfoSize";

export interface Settings {
  screenWidth?: string;
  zIndex?: number;
  bgColor?: string | ((size: IInfoSize) => string);
  iconSize?: number;
  arrowIconOpacity?: number;
  arrowIconOpacityHovered?: number;
  arrowIconColor?: string;
  arrowIconColorHovered?: string;
  cornerIconOpacity?: number;
  cornerIconOpacityHovered?: number;
  cornerIconColor?: string;
  cornerIconColorHovered?: string;
  inCornerContainerScale?: number;
  minimizedContainerScale?: number;
  transformScale?: number;
  inCornerOffset?: number;
  maximizedOffset?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: string;
}

const settingsDefault: Required<Settings> = {
  screenWidth: "100vw",
  zIndex: 99999,
  bgColor: "white",
  iconSize: 16,
  arrowIconOpacity: 1,
  arrowIconOpacityHovered: 0.5,
  arrowIconColor: "black",
  arrowIconColorHovered: "black",
  cornerIconOpacity: 1,
  cornerIconOpacityHovered: 0.5,
  cornerIconColor: "black",
  cornerIconColorHovered: "black",
  inCornerContainerScale: 1,
  minimizedContainerScale: 1,
  transformScale: 0.75,
  inCornerOffset: 6,
  maximizedOffset: 20,
  borderColor: "black",
  borderStyle: "solid",
  borderWidth: 2,
  borderRadius: 12,
};

export const SettingsContext =
  createContext<Required<Settings>>(settingsDefault);

export function SettingsProvider({
  settings = {},
  children,
}: {
  settings: Settings;
  children: ReactNode;
}) {
  const usedSettings: Required<Settings> = { ...settingsDefault, ...settings };

  const value: Required<Settings> = useMemo(
    () => ({ ...usedSettings }),
    [usedSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
