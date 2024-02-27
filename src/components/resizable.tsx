import React from "react";
import "./resizable.css";
import { ResizableBox } from "react-resizable";
import { ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {};
  } else {
    resizableProps = {};
  }
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={["s"]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 24]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
