"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "@/components/image/lightbox/Lightbox.module.css";
import ZoomInIcon from "@/components/icons/ZoomInIcon";
import ZoomOutIcon from "@/components/icons/ZoomOutIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { Photo, PhotoEnhanced } from "@/lib/type";
import ImageInfos from "@/components/image/common/ImageInfos";
import LimitedImageInfos from "@/components/image/common/LimitedImageInfos";

const ZOOM_SENSITIVITY = 0.4;
const ZOOM_SENSITIVITY_MOBILE = 0.6;
const MAX_ZOOM = 3;

const dblTouchTapMaxDelay = 300;
let latestTouchTap: { time: number; target: EventTarget | null } = {
  time: 0,
  target: null,
};

type Props = {
  photo: Photo | PhotoEnhanced;
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
  const background = useMemo(() => new Image(), []);
  const zoomSensibility = useMemo(
    () => (isSmall ? ZOOM_SENSITIVITY_MOBILE : ZOOM_SENSITIVITY),
    [isSmall],
  );

  function isDblTouchTap(e: React.TouchEvent<HTMLCanvasElement>) {
    const touchTap = {
      time: new Date().getTime(),
      target: e.currentTarget,
    };
    const isFastDblTouchTap =
      touchTap.target === latestTouchTap.target &&
      touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
    latestTouchTap = touchTap;
    return isFastDblTouchTap;
  }

  const getTouchLocation = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e.touches[0];
    const { offsetLeft, offsetTop } = e.currentTarget;
    return { x: clientX - offsetLeft, y: clientY - offsetTop };
  };

  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  const zoomIn = () => {
    setZoom((zoom) => clamp(zoom + zoom * zoomSensibility, zoomMin, MAX_ZOOM));
    if (isSmall && canvasRef.current) {
      const { x, y } = touch.current;
      setOffset({
        x: x - canvasRef.current.width / 2,
        y: y - canvasRef.current.height / 2,
      });
    }
    setIsInZoom(true);
  };

  const zoomOut = () => {
    setZoom((zoom) => clamp(zoom - zoom * zoomSensibility, zoomMin, MAX_ZOOM));
    if (isSmall || zoom === zoomMin) setIsInZoom(false);
  };

  const handleZoom = () => {
    if (isInZoom) zoomOut();
    else zoomIn();
  };

  // Mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    touch.current = getTouchLocation(e);
    if (isDblTouchTap(e)) handleZoom();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = touch.current;
    const { x: locationX, y: locationY } = getTouchLocation(e);
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

  // desktop
  const getMouseLocation = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e;
    const { offsetLeft, offsetTop } = e.currentTarget;
    return { x: clientX - offsetLeft, y: clientY - offsetTop };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isInZoom && !isDragging) {
      touch.current = getMouseLocation(e);
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const { x, y } = touch.current;
      const { x: locationX, y: locationY } = getMouseLocation(e);
      setOffset({
        x: offset.x + (x - locationX),
        y: offset.y + (y - locationY),
      });
      touch.current = { x: locationX, y: locationY };
    }
  };

  const handleMouseUp = () => setIsDragging(false);

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
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(background, 0, 0, width, height);
        setZoom(scale);
        setZoomMin(scale);
      }
    }
  };

  // 1) Set the listener on mount
  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          if (target.clientWidth > 0) {
            setCanvasSize();
          }
        });
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // 2) Set image as background
  useEffect(() => {
    background.src = photo.src;
    if (canvasRef.current) {
      background.onload = () => {
        setCanvasSize();
      };
    }
  }, []);

  // 3) On zoom or offset changes
  useEffect(() => {
    function draw() {
      if (
        canvasRef.current &&
        containerRef.current &&
        containerRef.current.clientWidth > 0
      ) {
        const { width, height } = canvasRef.current;
        const context = canvasRef.current.getContext("2d");

        if (context) {
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
    }

    if (background.width > 0) draw();
  }, [zoom, offset, background]);

  return (
    <div
      ref={containerRef}
      className={`${s.canvasContainer} ${isActive ? s.active : ""}`}
    >
      {"item" in photo ? (
        <div className={`${s.info} linkColor`}>
          <ImageInfos item={photo.item} isLightbox={true} />
        </div>
      ) : (
        <div className={`${s.info} ${s.limitedInfo} linkColor`}>
          <LimitedImageInfos photo={photo} />
        </div>
      )}
      {isSmall && (
        <>
          <canvas
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            ref={canvasRef}
          />
          <div className={s.toolbar}>
            <button className={`${s.icon} iconButton`} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </>
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
            <button className={`${s.icon} iconButton`} onClick={zoomIn}>
              <ZoomInIcon />
            </button>
            <button className={`${s.icon} iconButton`} onClick={zoomOut}>
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
