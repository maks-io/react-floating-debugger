import React, { ReactNode, useState } from "react";
import { InfoSettingsProvider } from "$/contexts/InfoSettingsContext";
import { Settings, SettingsProvider } from "$/contexts/SettingsContext";
import { ReadymadeChildren } from "$/components/ReadymadeChildren";
import useLocalStorage from "../hooks/useLocalStorage";
import { IInfoPosition } from "./IInfoPosition";
import { IInfoSize } from "./IInfoSize";
import { FloatingDebuggerContainer } from "./FloatingDebuggerContainer";
import { DirectionalPad } from "./DirectionalPad";
import { HoverContextProvider } from "$/contexts/HoverContext";
import { sleep } from "sleep-lightweight";

const buttonColor = "#1d2734";
const contentBGColor = "#98bdd2";

interface FloatingDebuggerSettings {
  position: IInfoPosition;
  size: IInfoSize;
}

export type AccordionItem = {
  title: string;
  content: ReactNode;
  isDefaultOpen?: boolean;
};

export type FloatingDebuggerChild =
  | ReactNode
  | ((size: IInfoSize) => FloatingDebuggerChildren)
  | AccordionItem;

export type FloatingDebuggerChildren =
  | FloatingDebuggerChild
  | FloatingDebuggerChild[];

export const FloatingDebugger = (
  props: {
    show?: boolean;
    children: FloatingDebuggerChildren;
    defaultSize?: IInfoSize;
    defaultPosition?: IInfoPosition;
  } & Settings
): JSX.Element | null => {
  const { show, defaultSize, defaultPosition } = props;

  const [getInfoSettings, setInfoSettings] =
    useLocalStorage<FloatingDebuggerSettings>("environment-info-settings", {
      size: defaultSize || "MINIMIZED",
      position: defaultPosition || "BOTTOM_LEFT",
    });

  if (!show) {
    return null;
  }

  const [blockTransitions, setBlockTransitions] = useState(false);
  const infoSettings = getInfoSettings();
  const { position: currentPosition, size: currentSize } = infoSettings;

  return (
    <HoverContextProvider>
      <InfoSettingsProvider infoSettings={infoSettings}>
        <SettingsProvider settings={props}>
          <FloatingDebuggerContainer
            textColor={"black"}
            onClick={() => {
              if (currentSize === "IN_CORNER") {
                setInfoSettings({ ...infoSettings, size: "MAXIMIZED" });
              } else if (currentSize === "MINIMIZED") {
                setInfoSettings({ ...infoSettings, size: "IN_CORNER" });
              }
            }}
          >
            <DirectionalPad
              moveTo={(position: IInfoPosition) => {
                setInfoSettings({ ...infoSettings, position });
              }}
              currentPosition={currentPosition}
              currentSize={currentSize}
              unmaximize={async (position: IInfoPosition) => {
                setBlockTransitions(true);
                setInfoSettings({ position, size: "IN_CORNER" });
                await sleep(500);
                setBlockTransitions(false);
              }}
              minimize={() => {
                setInfoSettings({ ...infoSettings, size: "MINIMIZED" });
              }}
              buttonColor={buttonColor}
              contentBGColor={contentBGColor}
            >
              <div style={{ overflow: "hidden" }}>
                {ReadymadeChildren(props.children, infoSettings.size)}
              </div>
              <style>
                {` /* Hide scrollbar for Chrome, Safari and Opera */
                 .no-scrollbar > *{
                    -ms-overflow-style: none;
                 }
                 .no-scrollbar::-webkit-scrollbar {
                     display: none;
                 }
                 
                 /* Hide scrollbar for IE, Edge and Firefox */
                 .no-scrollbar {
                   -ms-overflow-style: none !important;  /* IE and Edge */
                   scrollbar-width: none !important;  /* Firefox */
                 }
                      `}
              </style>
            </DirectionalPad>
          </FloatingDebuggerContainer>
        </SettingsProvider>
      </InfoSettingsProvider>
      <style>{blockTransitions && ` * { transition: none !important; }`}</style>
    </HoverContextProvider>
  );
};
