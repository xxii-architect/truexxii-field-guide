"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Button from "@/core/components/Button";
import { uiClasses } from "@/shared/constants/ui";
import type { MapSelection } from "@/domains/plant-id/types";

interface PlantLocationModalProps {
  selectedPlant: MapSelection | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlantLocationModal({
  selectedPlant,
  isOpen,
  onClose,
}: PlantLocationModalProps) {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const dragDataRef = useRef({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const onDragMove = useCallback((event: globalThis.MouseEvent) => {
    if (!dragDataRef.current.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragDataRef.current.startX;
    const deltaY = event.clientY - dragDataRef.current.startY;

    setModalPosition({
      x: dragDataRef.current.originX + deltaX,
      y: dragDataRef.current.originY + deltaY,
    });
  }, []);

  const onDragEnd = useCallback(function handleDragEnd() {
    dragDataRef.current.isDragging = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  }, [onDragMove]);

  const onDragStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    dragDataRef.current = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: modalPosition.x,
      originY: modalPosition.y,
    };

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
  };

  const onBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!selectedPlant) {
    return null;
  }

  return (
    <div
      className={`${uiClasses.modalBackdrop} ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onBackdropClick}
    >
      <div
        className={`${uiClasses.modalPanel} ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ left: modalPosition.x, top: modalPosition.y }}
      >
        <div
          className="cursor-grab bg-gradient-to-r from-[#122311] via-[#132712] to-[#0b1208] px-5 py-4 border-b border-white/10 flex items-center justify-between"
          onMouseDown={onDragStart}
        >
          <div>
            <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">Location Preview</p>
            <h2 className="text-xl font-semibold text-white">{selectedPlant.name}</h2>
          </div>
          <button
            onClick={onClose}
            className={uiClasses.closeButton}
            aria-label="Close map modal"
          >
            ✕
          </button>
        </div>

        <div className={uiClasses.modalContent}>
          <div className={uiClasses.mapInfoGrid}>
            <div className={`${uiClasses.mapInfoCard} bg-[#0f2214]/90`}>Latitude: {selectedPlant.latitude}</div>
            <div className={`${uiClasses.mapInfoCard} bg-[#0f2214]/90`}>Longitude: {selectedPlant.longitude}</div>
          </div>

          <div className={uiClasses.mapFrame}>
            <iframe
              title="Plant location map"
              src={`https://maps.google.com/maps?q=${selectedPlant.latitude},${selectedPlant.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className={`${uiClasses.modalFooter} text-[#d6c4ab]`}>
            <p className="leading-relaxed">
              Drag the top bar to reposition the panel. Click outside or press Escape to close.
            </p>
            <Button variant="ghost" label="Close Map" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
