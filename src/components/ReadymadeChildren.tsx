import React, { ReactNode } from "react";
import { IInfoSize } from "$/components/IInfoSize";
import {
  FloatingDebuggerChild,
  FloatingDebuggerChildren,
} from "$/components/FloatingDebugger";
import { AccordionItem } from "$/components/AccordionItem/AccordionItem";

export const ReadymadeChildren = (
  children: FloatingDebuggerChildren,
  currentSize: IInfoSize
): ReactNode => {
  const renderOneChild = (
    child,
    index: number | string,
    isSubComponent = false
  ) => {
    if (!child) {
      const key = `invalid-child-at-index-${index}-case-a`;
      return (
        <div id={key} key={key}>
          Invalid child to render at index {index} (case a)
        </div>
      );
    } else if (String(child?.["$$typeof"]) === "Symbol(react.element)") {
      return child;
    } else if (typeof child === "object" && !Array.isArray(child)) {
      if (!isSubComponent && !child.title) {
        const key = `child-${index}-without-title-prop`;
        return (
          <div id={key} key={key}>
            Cannot render object at index {index} without a title.
          </div>
        );
      } else if (!isSubComponent && !child.content) {
        const key = `child-${index}-without-content-prop`;
        return (
          <div id={key} key={key}>
            Cannot render object at index {index} without a content.
          </div>
        );
      } else if (!isSubComponent) {
        const key = `child-${index}`;
        return (
          <div id={key} key={key}>
            <AccordionItem
              key={`accordeon-item-for-child-${index}`}
              uniqueKey={`accordeon-item-for-child-${index}`}
              title={child.title}
              body={renderOneChild(child.content, index, true)}
              isDefaultOpen={
                child.isDefaultOpen !== undefined ? child.isDefaultOpen : true
              }
            />
          </div>
        );
      } else {
        return child;
      }
    } else if (typeof child === "function") {
      const childRes = child(currentSize);
      if (Array.isArray(childRes)) {
        return childRes.map((cr, childIndex) =>
          renderOneChild(cr, `${index}.${childIndex}`, false)
        );
      }
      return childRes;
    } else if (Array.isArray(child)) {
      return child.map((cr, childIndex) =>
        renderOneChild(cr, `${index}.${childIndex}`, false)
      );
    } else {
      const key = `invalid-child-at-index-${index}-case-b`;
      return (
        <div id={key} key={key}>
          Invalid child to render at index {index} (case b)
        </div>
      );
    }
  };

  const childrenArray: FloatingDebuggerChild[] = Array.isArray(children)
    ? children
    : [children];
  const ca = childrenArray.map((child, index) => renderOneChild(child, index));

  if (ca.length === 1) {
    return ca[0];
  }

  return ca;
};
