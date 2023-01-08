import React, { createContext, ReactNode, useMemo } from "react";
import { IInfoSize } from "$/components/IInfoSize";
import { IInfoPosition } from "$/components/IInfoPosition";

interface InfoSettings {
  position?: IInfoPosition;
  size?: IInfoSize;
}

const infoSettingsDefault: Required<InfoSettings> = {
  size: "MINIMIZED",
  position: "TOP_LEFT",
};

export const InfoSettingsContext =
  createContext<Required<InfoSettings>>(infoSettingsDefault);

export function InfoSettingsProvider({
  infoSettings = {},
  children,
}: {
  infoSettings: InfoSettings;
  children: ReactNode;
}) {
  const usedInfoSettings: Required<InfoSettings> = {
    ...infoSettingsDefault,
    ...infoSettings,
  };

  const value: Required<InfoSettings> = useMemo(
    () => ({ ...usedInfoSettings }),
    [usedInfoSettings]
  );

  return (
    <InfoSettingsContext.Provider value={value}>
      {children}
    </InfoSettingsContext.Provider>
  );
}
