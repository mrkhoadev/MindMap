"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { RiFullscreenLine } from "react-icons/ri";
import { ControlButton, Panel } from "reactflow";

export default function CustomControls() {
  const onZoomInHandler = (e, t) => {
    console.log(e, t);
    // ZoomInOut();
  };
  return (
    <Panel position="bottom-left" className="react-flow__controls">
      <ControlButton
        onClick={onZoomInHandler}
        className="react-flow__controls-zoomin"
        title="zoom in"
        aria-label="zoom in"
        // disabled={maxZoomReached}
      >
        <FaPlus />
      </ControlButton>
      <ControlButton
        // onClick={onZoomInHandler}
        className="react-flow__controls-fitview"
        // title="zoom in"
        // aria-label="zoom in"
        // disabled={maxZoomReached}
      >
        <FaMinus />
      </ControlButton>
      <ControlButton
      // onClick={onZoomInHandler}
      // className="react-flow__controls-zoomin"
      // title="zoom in"
      // aria-label="zoom in"
      // disabled={maxZoomReached}
      >
        <RiFullscreenLine />
      </ControlButton>
    </Panel>
  );
}
