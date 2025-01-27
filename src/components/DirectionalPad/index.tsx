import React, { JSX, ReactNode } from "react";
import { IInfoPosition } from "../IInfoPosition";
import { IInfoSize } from "../IInfoSize";
import { IArrowPosition } from "./IArrowPosition";
import { DirectionalPadContainer } from "./DirectionalPadContainer";
import { MoveButton } from "./MoveButton";
import { HorizontalPadButtonContainer } from "./HorizontalPadButtonContainer";
import { ChildrenContainer } from "./ChildrenContainer";
import { HoverArea } from "$/components/DirectionalPad/HoverArea";

export const DirectionalPad = ({
  children,
  currentPosition,
  currentSize,
  moveTo,
  unmaximize,
  minimize,
  buttonColor,
  contentBGColor,
}: {
  children: ReactNode;
  currentPosition: IInfoPosition;
  currentSize: IInfoSize;
  moveTo: (position: IArrowPosition) => void;
  unmaximize: (position: IInfoPosition) => void;
  minimize: () => void;
  buttonColor: string;
  contentBGColor: string;
}): JSX.Element => {
  const propsForMoveButton = {
    currentPosition,
    currentSize,
    moveTo,
    unmaximize,
    minimize,
    buttonColor,
  };
  return (
    <DirectionalPadContainer>
      <HoverArea />
      <HorizontalPadButtonContainer>
        <MoveButton {...propsForMoveButton} position="TOP_LEFT" degrees={225} />
        <MoveButton
          {...propsForMoveButton}
          position="TOP_CENTER"
          degrees={270}
        />
        <MoveButton
          {...propsForMoveButton}
          position="TOP_RIGHT"
          degrees={315}
        />
      </HorizontalPadButtonContainer>
      <HorizontalPadButtonContainer isMiddleRow>
        <MoveButton {...propsForMoveButton} position="LEFT" degrees={180} />
        <ChildrenContainer>{children}</ChildrenContainer>
        <MoveButton {...propsForMoveButton} position="RIGHT" degrees={0} />
      </HorizontalPadButtonContainer>
      <HorizontalPadButtonContainer>
        <MoveButton
          {...propsForMoveButton}
          position="BOTTOM_LEFT"
          degrees={135}
        />
        <MoveButton
          {...propsForMoveButton}
          position="BOTTOM_CENTER"
          degrees={90}
        />
        <MoveButton
          {...propsForMoveButton}
          position="BOTTOM_RIGHT"
          degrees={45}
        />
      </HorizontalPadButtonContainer>
    </DirectionalPadContainer>
  );
};
