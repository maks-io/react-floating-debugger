import React, { useContext } from "react";
import { AccordionToggleButton } from "$/components/AccordionItem/AccordionToggleButton";
import { SettingsContext } from "$/contexts/SettingsContext";

export const AccordionItemHeader = ({
  children,
  isOpen,
  setOpen,
}): JSX.Element => {
  const { iconSize } = useContext(SettingsContext);
  return (
    <div
      style={{
        fontSize: 16,
        fontWeight: "bold",
        position: "relative",
        height: iconSize * 1.5 + 2 * 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          opacity: 0.25,
          width: "100%",
          height: "100%",
        }}
      />
      <div style={{ position: "absolute", top: 2, right: 2 }}>
        <AccordionToggleButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </div>
  );
};
