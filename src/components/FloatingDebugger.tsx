import React, { ReactNode } from "react";
import { InfoSettingsProvider } from "$/contexts/InfoSettingsContext";
import { Settings, SettingsProvider } from "$/contexts/SettingsContext";
import { ReadymadeChildren } from "$/components/ReadymadeChildren";
import useLocalStorage from "../hooks/useLocalStorage";
import { IInfoPosition } from "./IInfoPosition";
import { IInfoSize } from "./IInfoSize";
import { FloatingDebuggerContainer } from "./FloatingDebuggerContainer";
import { DirectionalPad } from "./DirectionalPad";

const buttonColor = "#1d2734";
const contentBGColor = "#98bdd2";

interface FloatingDebuggerSettings {
  position: IInfoPosition;
  size: IInfoSize;
}
/*
type SimpleReactNodeOrFunction =
  | ReactNode
  | ((size: IInfoSize) => ReactNode)
  | ((size: IInfoSize) => FloatingDebuggerChild);

interface AccordionItem {
  title: string;
  content: SimpleReactNodeOrFunction;
  isDefaultOpen?: boolean;
}

export type FloatingDebuggerChild =
  | SimpleReactNodeOrFunction
  | AccordionItem
  | AccordionItem[];*/

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
    useLocalStorage<FloatingDebuggerSettings>("environment-info-shown", {
      size: defaultSize || "MINIMIZED",
      position: defaultPosition || "BOTTOM_LEFT",
    });

  if (!show) {
    return null;
  }

  const infoSettings = getInfoSettings();
  const { position: currentPosition, size: currentSize } = infoSettings;

  return (
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
            unmaximize={(position: IInfoPosition) => {
              setInfoSettings({ position, size: "IN_CORNER" });
            }}
            minimize={() => {
              setInfoSettings({ ...infoSettings, size: "MINIMIZED" });
            }}
            buttonColor={buttonColor}
            contentBGColor={contentBGColor}
          >
            {ReadymadeChildren(props.children, infoSettings.size)}
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
  );
};
