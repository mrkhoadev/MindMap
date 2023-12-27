import React, { memo, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore, useStoreApi, useReactFlow, Panel} from '@reactflow/core';
import { ControlButton } from 'reactflow';
import cc from 'classcat';

import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiFullscreenFill } from "react-icons/ri";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineLockOpen } from "react-icons/hi2";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import useFlowStore from '@/providers/useFlowStore';
import FlowSelector from '@/providers/selectors/FlowSelector';

const selector = (s) => ({
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
})

const CustomControls = ({
  style,
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  showScreenActive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onScreenActiveChange,
  className,
  children,
  position = 'bottom-left',
  isScreen,
  isAccountValid,
}) => {
  const store = useStoreApi();
  const [isVisible, setIsVisible] = useState(false);
  const { minZoomReached, maxZoomReached } = useStore(selector, shallow);
  const { isInteractive = true, setIsInteractive } = useFlowStore(FlowSelector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(
    () =>{
      if (isAccountValid) 
      {
        store.setState({
          nodesDraggable: isInteractive,
          nodesConnectable: isInteractive,
          elementsSelectable: isInteractive,
        });
      } else {
        store.setState({
          nodesDraggable: false,
          nodesConnectable: false,
          elementsSelectable: false,
        });
      }
    },[
        store,
        isInteractive,
        isAccountValid
      ]
  )

  if (!isVisible) {
    return null;
  }

  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };

  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };

  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };

  const onToggleInteractivity = () => {
    if (isAccountValid) 
    {
      setIsInteractive(!isInteractive);
    }
  };
  const onToggleScreen = () => {
    onScreenActiveChange(!isScreen)
  }
  
  

  return (
    <Panel
      className={cc(['react-flow__controls', className])}
      position={position}
      style={style}
      data-testid="rf__controls"
    >
      {showZoom && (
        <>
          <ControlButton
            onClick={onZoomInHandler}
            className="react-flow__controls-zoomin"
            title="zoom in"
            aria-label="zoom in"
            disabled={maxZoomReached}
          >
            <FaPlus /> 
          </ControlButton>
          <ControlButton
            onClick={onZoomOutHandler}
            className="react-flow__controls-zoomout"
            title="zoom out"
            aria-label="zoom out"
            disabled={minZoomReached}
          >
            <FaMinus />
          </ControlButton>
        </>
      )}
      {showFitView && (
        <ControlButton
          className="react-flow__controls-fitview"
          onClick={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
        >
          <RiFullscreenFill />
        </ControlButton>
      )}
      {showInteractive && (
        <ControlButton
          className="react-flow__controls-interactive"
          onClick={onToggleInteractivity}
          title="toggle interactivity"
          aria-label="toggle interactivity"
        >
          {isAccountValid ? (
            isInteractive ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />
          ) :  <HiOutlineLockClosed className='text-[#aaa]' /> 
          }
        </ControlButton>
      )}
      {showScreenActive && (
        <ControlButton
          className=' text-2xl bg-[red]'
          title="toggle Screen"
          aria-label="toggle Screen"
          onClick={onToggleScreen}
        >
          {isScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
        </ControlButton>
      )}
      {children}
    </Panel>
  );
};

CustomControls.displayName = 'Controls';

export default memo(CustomControls);