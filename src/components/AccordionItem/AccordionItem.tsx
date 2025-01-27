import React, {JSX, ReactNode, useContext } from "react";
import { AccordionItemHeader } from "$/components/AccordionItem/AccordionItemHeader";
import { AccordionItemBody } from "$/components/AccordionItem/AccordionItemBody";
import useLocalStorage from "$/hooks/useLocalStorage";
import { SettingsContext } from "$/contexts/SettingsContext";

export const AccordionItem = ({
  uniqueKey,
  title,
  body,
  isDefaultOpen,
}: {
  key: string;
  uniqueKey: string;
  title: string;
  body: ReactNode;
  isDefaultOpen: boolean;
}): JSX.Element => {
  const { borderRadius, borderWidth, borderStyle, borderColor } =
    useContext(SettingsContext);

  const [getIsOpen, setIsOpen] = useLocalStorage<boolean>(
    `environment-info-open-state-for-${uniqueKey}`,
    isDefaultOpen
  );

  const isOpen: boolean = getIsOpen();

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius,
        borderWidth,
        borderStyle,
        borderColor,
        marginBottom: 8,
      }}
    >
      <AccordionItemHeader isOpen={isOpen} setOpen={setIsOpen}>
        {title}
      </AccordionItemHeader>
      <AccordionItemBody isOpen={isOpen}>{body}</AccordionItemBody>
    </div>
  );
};
