import React, { ReactNode } from "react";

export const HorizontalPadButtonContainer = ({
  children,
  isMiddleRow = false,
}: {
  children: ReactNode;
  isMiddleRow?: boolean;
}) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      minHeight: 0,
      flex: isMiddleRow ? 1 : undefined,
    }}
  >
    {children}
  </div>
);
