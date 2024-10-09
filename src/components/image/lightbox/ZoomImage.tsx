"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "@/components/image/lightbox/Lightbox.module.css";
import ZoomInIcon from "@/components/admin/icons/ZoomInIcon";
import ZoomOutIcon from "@/components/admin/icons/ZoomOutIcon";
import CloseIcon from "@/components/admin/icons/CloseIcon";
import { Photo } from "@/lib/db/item";

const ZOOM_SENSITIVITY = 0.4;
const ZOOM_SENSITIVITY_MOBILE = 0.6;
const MAX_ZOOM = 3;

const dblTouchTapMaxDelay = 300;
let latestTouchTap = {
  time: 0,
  target: null,
};

type Props = {
  photo: Photo;
  isActive: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isSmall: boolean;
};

export default function ZoomImage({
  photo,
  isActive,
  onClose,
  onPrev,
  onNext,
  isSmall,
}: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [zoomMin, setZoomMin] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isInZoom, setIsInZoom] = useState(false);

  const touch = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver>(null);
  const background = useMemo(() => new Image(), []);
  const zoomSensibility = useMemo(
    () => (isSmall ? ZOOM_SENSITIVITY_MOBILE : ZOOM_SENSITIVITY),
    [isSmall],
  );

  function isDblTouchTap(event) {
    const touchTap = {
      time: new Date().getTime(),
      target: event.currentTarget,
    };
    const isFastDblTouchTap =
      touchTap.target === latestTouchTap.target &&
      touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
    latestTouchTap = touchTap;
    return isFastDblTouchTap;
  }

  const getLocation = (e) => {
    const isTouch =
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend";
    const { clientX, clientY } = isTouch ? e.targetTouches[0] : e;
    const { offsetLeft, offsetTop } = isTouch
      ? e.targetTouches[0].target
      : e.target;
    return { x: clientX - offsetLeft, y: clientY - offsetTop };
  };

  const handleTouchStart = (e) => {
    touch.current = getLocation(e);
    if (isDblTouchTap(e)) {
      isInZoom ? handleZoomOut() : handleZoomIn();
    }
  };

  const handleTouchMove = (e) => {
    const { x, y } = touch.current;
    const { x: locationX, y: locationY } = getLocation(e);
    setSwipeOffset({
      x: x - locationX,
      y: y - locationY,
    });
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      if (swipeOffset.x > 150) {
        onNext();
      }
      if (swipeOffset.x < -150) {
        onPrev();
      }
      if (swipeOffset.y > 150) {
        onClose();
      }
      setIsSwiping(false);
    }
  };

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const handleZoomIn = () => {
    if (!isDragging) {
      setZoom((zoom) =>
        clamp(zoom + zoom * zoomSensibility, zoomMin, MAX_ZOOM),
      );
      if (isSmall) {
        const { x, y } = touch.current;
        setOffset({
          x: x - canvasRef.current.width / 2,
          y: y - canvasRef.current.height / 2,
        });
        setIsInZoom(true);
      }
    }
  };

  const handleZoomOut = () => {
    if (!isDragging) {
      setZoom((zoom) =>
        clamp(zoom - zoom * zoomSensibility, zoomMin, MAX_ZOOM),
      );
      if (isSmall) setIsInZoom(false);
    }
  };

  const handleMouseDown = (e) => {
    touch.current = getLocation(e);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const { x, y } = touch.current;
      const { x: locationX, y: locationY } = getLocation(e);
      setOffset({
        x: offset.x + (x - locationX),
        y: offset.y + (y - locationY),
      });
      touch.current = { x: locationX, y: locationY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const setCanvasSize = () => {
    let scale = 1;

    if (containerRef.current && canvasRef.current) {
      if (containerRef.current.clientWidth < photo.width) {
        scale = containerRef.current.clientWidth / photo.width;
      }

      if (containerRef.current.clientHeight < photo.height) {
        scale = Math.min(
          scale,
          containerRef.current.clientHeight / photo.height,
        );
      }

      const width = photo.width * scale;
      const height = photo.height * scale;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      canvasRef.current
        .getContext("2d")
        .drawImage(background, 0, 0, width, height);

      setZoom(scale);
      setZoomMin(scale);
    }
  };

  // 1) Set image as background
  useEffect(() => {
    background.src = photo.src;
    if (canvasRef.current) {
      background.onload = () => {
        setCanvasSize();
      };
    }
  }, [background, photo]);

  // 2) Set the listener
  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        if (target.clientWidth > 0) {
          setCanvasSize();
        }
      });
    });
    const container = containerRef.current;
    observer.current.observe(container);

    return () => observer.current.unobserve(container);
  }, []);

  // 3) On zoom or offset changes
  useEffect(() => {
    function draw() {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current;
        const context = canvasRef.current.getContext("2d");

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        const displayedImageW = Math.round(background.width * zoom);
        const maxOffsetX = (displayedImageW - width) / 2;
        const displayedImageH = Math.round(background.height * zoom);
        const maxOffsetY = (displayedImageH - height) / 2;

        if (offset.x > maxOffsetX) offset.x = maxOffsetX;
        if (offset.x < -maxOffsetX) offset.x = -maxOffsetX;
        if (offset.y > maxOffsetY) offset.y = maxOffsetY;
        if (offset.y < -maxOffsetY) offset.y = -maxOffsetY;

        context.translate(-offset.x, -offset.y);
        context.scale(zoom, zoom);
        context.clearRect(0, 0, width, height);

        const x = (context.canvas.width / zoom - background.width) / 2;
        const y = (context.canvas.height / zoom - background.height) / 2;

        context.drawImage(background, x, y);
      }
    }
    if (containerRef.current.clientWidth > 0) {
      draw();
    }
  }, [zoom, offset, background]);

  return (
    <div
      ref={containerRef}
      className={`${s.canvasContainer} ${isActive ? s.active : ""}`}
    >
      {isSmall && (
        <canvas
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          ref={canvasRef}
        />
      )}
      {!isSmall && (
        <>
          <canvas
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={canvasRef}
          />
          <div className={s.toolbar}>
            <button className={`${s.icon} iconButton`} onClick={handleZoomIn}>
              <ZoomInIcon />
            </button>
            <button className={`${s.icon} iconButton`} onClick={handleZoomOut}>
              <ZoomOutIcon />
            </button>
            <button className={`${s.icon} iconButton`} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
