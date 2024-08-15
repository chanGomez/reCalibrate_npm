import React, { useEffect, useRef } from "react";
import "../App.css";
  //DRAG FEATURE with full drag and drop motion
  //--------------------------- 
    // const containerRef = useRef(null);
    // const boxRef = useRef(null);
    // const isClicked = useRef(false);
    // const coords = useRef({
    //   startX: 0,
    //   startY: 0,
    //   lastX: 0,
    //   lastY: 0,
    // });

    // useEffect(() => {
    //   if (!boxRef.current || !containerRef.current) return;

    //   const box = boxRef.current;
    //   const container = containerRef.current;

    //   const onMouseDown = (e) => {
    //     isClicked.current = true;
    //     coords.current.startX = e.clientX;
    //     coords.current.startY = e.clientY;
    //   };

    //   const onMouseUp = (e) => {
    //     isClicked.current = false;
    //     coords.current.lastX = box.offsetLeft;
    //     coords.current.lastY = box.offsetTop;
    //   };

    //   const onMouseMove = (e) => {
    //     if (!isClicked.current) return;

    //     const nextX = e.clientX - coords.current.startX + coords.current.lastX;
    //     const nextY = e.clientY - coords.current.startY + coords.current.lastY;

    //     box.style.top = `${nextY}px`;
    //     box.style.left = `${nextX}px`;
    //   };

    //   box.addEventListener("mousedown", onMouseDown);
    //   box.addEventListener("mouseup", onMouseUp);
    //   container.addEventListener("mousemove", onMouseMove);
    //   container.addEventListener("mouseleave", onMouseUp);

    //   const cleanup = () => {
    //     box.removeEventListener("mousedown", onMouseDown);
    //     box.removeEventListener("mouseup", onMouseUp);
    //     container.removeEventListener("mousemove", onMouseMove);
    //     container.removeEventListener("mouseleave", onMouseUp);
    //   };

    //   return cleanup;
    // }, []);
  //---------------------------

export const ReCalibrate = ({ children }) => {
  // console.log(children)
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    let wrappedElement = parentRef.current.children[0];
    wrappedElement.style.width = wrappedElement.style.width
      ? wrappedElement.style.width
      : window.getComputedStyle(wrappedElement).getPropertyValue("width");
    wrappedElement.style.height = wrappedElement.style.height
      ? wrappedElement.style.height
      : window.getComputedStyle(wrappedElement).getPropertyValue("height");

    // console.log(window.getComputedStyle(wrappedElement).margin)
    parentRef.current.style.width = window
      .getComputedStyle(wrappedElement)
      .getPropertyValue("width");
    parentRef.current.style.height = window
      .getComputedStyle(wrappedElement)
      .getPropertyValue("height");
    parentRef.current.style.margin =
      window.getComputedStyle(wrappedElement).margin;
    // console.log(parentRef.current.style.margin)
    childRef.current.style.bottom = changeBottom(
      window.getComputedStyle(wrappedElement).margin
    );

    childRef.current.draggable = true;

    let x;
    let y;
    childRef.current.addEventListener("dragstart", (event) => {
      x = event.clientX;
      y = event.clientY;
    });

    childRef.current.addEventListener("dragend", (event) => {
      let newWidth = changeWidth(wrappedElement.style.width, event.clientX - x);
      let newHeight = changeHeight(
        wrappedElement.style.height,
        event.clientY - y
      );

      parentRef.current.style.width = newWidth;
      wrappedElement.style.width = newWidth;

      parentRef.current.style.height = newHeight;
      wrappedElement.style.height = newHeight;
    });
  }, []);

  return (
    <section ref={parentRef} className="parent">
      {children}
      <div ref={childRef} className="reCalibrateButton"></div>
    </section>
  );
};

function changeWidth(prevWidth, difference) {
  let initalWidth = Number(prevWidth.slice(0, prevWidth.length - 2));
  let finalWidth = initalWidth + difference * -1;

  console.log(initalWidth, finalWidth, difference);
  return Math.floor(finalWidth) + "px";
}

function changeHeight(prevHeight, difference) {
  let initalHeight = Number(prevHeight.slice(0, prevHeight.length - 2));
  let finalHeight = initalHeight + difference;

  return Math.floor(finalHeight) + "px";
}

function changeBottom(margin) {
  if (margin === "0px") {
    return "5px";
  }

  let margins = margin.split(" ");
  let finalMargin = margins.reduce(
    (sum, margin) => Number(margin.slice(0, margin.length - 2)) + sum,
    5
  );
  console.log(finalMargin + "px");
  return finalMargin + "px";
}