import React from "react";

export const AccordionItemBody = ({ children, isOpen }): JSX.Element => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="no-scrollbar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          opacity: 0.15,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        className="no-scrollbar"
        style={{
          padding: 12,
          overflow: "scroll",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};
