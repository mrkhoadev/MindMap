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
import handleCheckAccount from '@/helpers/checkAccount';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

const selector = (s) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
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
  onInteractiveChange,
  onScreenActiveChange,
  className,
  children,
  position = 'bottom-left',
  isScreen,
  email
}) => {
  const store = useStoreApi();
  const [isVisible, setIsVisible] = useState(false);
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(selector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const isAccountValid = handleCheckAccount(flowDetails?.userEmail, email, flowDetails?.isAccessible);


  useEffect(() => {
    setIsVisible(true);
    if (isAccountValid) {
      store.setState({
        nodesDraggable: true,
        nodesConnectable: true,
        elementsSelectable: true,
      });
    } else {
      store.setState({
        nodesDraggable: false,
        nodesConnectable: false,
        elementsSelectable: false,
      });
    }
  }, [email]);

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
    if (handleCheckAccount(flowDetails?.userEmail, email, flowDetails?.isAccessible))
    {
      store.setState({
        nodesDraggable: !isInteractive,
        nodesConnectable: !isInteractive,
        elementsSelectable: !isInteractive,
      });

      onInteractiveChange?.(!isInteractive);
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