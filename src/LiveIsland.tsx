import {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './LiveIsland.scss';

const getVal = (val: number | string) => {
  return typeof val === 'number' ? `${val}px` : val;
};

export type LiveIslandProps = {
  className?: string;
  top?: number | string;

  smallClassName?: string;
  smallWidth?: number | string;
  smallHeight?: number | string;

  largeClassName?: string;
  largeWidth?: number | string;
  largeHeight?: number | string;
  largeRadius?: number | string;

  wrapperClassName?: string;
  triggerType?: 'click' | 'hover';
  initialAnimation?: boolean;

  onChange?: (isSmall: boolean) => void;
  children?: (isSmall: boolean) => ReactNode;
};

const LiveIsland = (props: LiveIslandProps) => {
  const {
    className = '',
    top = 10,

    smallClassName = '',
    smallWidth = 96,
    smallHeight = 30,

    largeClassName = '',
    largeWidth = 400,
    largeHeight = 180,
    largeRadius = 36,

    wrapperClassName = '',
    triggerType = 'click',
    initialAnimation = false,

    onChange,
    children,
  } = props;

  const [isSmall, setIsSmall] = useState(true);

  const hasMount = useRef(false);
  useEffect(() => {
    hasMount.current = true;
  }, []);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const onOpen = () => {
    navigator.vibrate?.(200);
    setIsSmall(false);
    onChangeRef.current?.(true);
  };

  const onClose = () => {
    setIsSmall(true);
    onChangeRef.current?.(false);
  };

  const isClickType = triggerType === 'click';

  const triggerProps = useMemo(() => {
    if (isClickType) {
      return { onClick: onOpen };
    }

    return {
      onMouseEnter: onOpen,
      onMouseLeave: onClose,
    };
  }, [isClickType]);

  useEffect(() => {
    const onScroll = () => onClose();

    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return (
    <div
      className={`dynamic-island-wrapper fixed z-[99999] ${wrapperClassName}`}
      style={
        {
          '--top': getVal(top),
          '--small-width': getVal(smallWidth),
          '--small-height': getVal(smallHeight),
          '--large-width': getVal(largeWidth),
          '--large-height': getVal(largeHeight),
          '--large-radius': getVal(largeRadius),
        } as CSSProperties
      }
    >
      {isClickType && (
        <div
          className={`dynamic-island-overlay ${isSmall ? '' : 'fixed inset-0'}`}
          onClick={onClose}
        />
      )}

      <div
        className={`dynamic-island fixed left-1/2 top-[--top] h-[--small-height] w-[--small-width] -translate-x-1/2 select-none overflow-hidden rounded-[--small-height] bg-black text-white [box-shadow:inset_0_0_0_1.5px_rgb(255_255_255/0.15),0_1px_2px_rgb(0_0_0/0.2)] [&>*]:absolute [&>*]:inset-0 ${className} ${
          isSmall
            ? `${smallClassName} cursor-pointer text-[12px] duration-300 hover:scale-105 ${
                initialAnimation || (!initialAnimation && hasMount.current)
                  ? 'animate-[turn-to-small_0.4s_ease-out_both]'
                  : ''
              }`
            : `${largeClassName} animate-[turn-to-large_0.4s_ease-out_both]`
        }`}
        {...triggerProps}
      >
        {children?.(isSmall)}
      </div>

      <div className="dynamic-island-camera pointer-events-none fixed left-1/2 top-[calc(var(--top)+var(--small-height)*0.5)] ml-[calc(var(--small-height)*1.14)] aspect-square h-[calc(var(--small-height)*0.24)] -translate-x-1/2 -translate-y-1/2 rounded-full [background-color:#080928] [background:radial-gradient(#6667ac,transparent_50%)_33.3%_10%/75%_50%_no-repeat,radial-gradient(#454680,transparent_50%)_60%_85%/50%_50%_no-repeat] [box-shadow:inset_0_0_0.25em_#4c4da3]" />
    </div>
  );
};

export default LiveIsland;
