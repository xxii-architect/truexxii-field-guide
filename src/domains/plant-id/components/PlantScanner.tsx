"use client";

import { useEffect, useRef, useState } from "react";
import { usePlantScanner } from "@/domains/plant-id/hooks/usePlantScanner";
import { identifyPlantScan, type PlantIdentificationResponse } from "@/domains/plant-id/services/scanService";
import Button from "@/core/components/Button";
import { themeClasses } from "@/shared/constants/theme";

export default function PlantScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [quickDrawLoading, setQuickDrawLoading] = useState(false);
  const [quickDrawError, setQuickDrawError] = useState<string | null>(null);
  const [quickDrawResult, setQuickDrawResult] = useState<PlantIdentificationResponse | null>(null);
  const { image, setImage, loading, result, scanData, error, identifyPlant } = usePlantScanner();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobile =
      navigator.maxTouchPoints > 0 ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia?.("(pointer: coarse)").matches;

    setIsMobile(mobile);
    if (mobile) {
      setCameraActive(true);
    }
  }, []);

  useEffect(() => {
    if (!cameraActive || !isMobile) {
      return;
    }

    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setCameraError(
          err instanceof Error
            ? err.message
            : "Unable to access the camera. Please allow camera permission or choose an image."
        );
      }
    };

    startCamera();

    return () => {
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraActive, isMobile]);

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCameraActive(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) {
      setCameraError("Camera is not available.");
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setCameraError("Unable to capture the image.");
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.95));
    if (!blob) {
      setCameraError("Unable to capture the image.");
      return;
    }

    const file = new File([blob], `plant-${Date.now()}.jpg`, { type: "image/jpeg" });
    setCapturedFile(file);
    setCapturedImageUrl(URL.createObjectURL(file));
    await identifyCapturedPhoto(file);
  };

  const identifyCapturedPhoto = async (file: File) => {
    setQuickDrawError(null);
    setQuickDrawLoading(true);
    setQuickDrawResult(null);

    try {
      const data = await identifyPlantScan(file);
      setQuickDrawResult(data);
    } catch (err) {
      setQuickDrawError(err instanceof Error ? err.message : "Unable to identify specimen.");
    } finally {
      setQuickDrawLoading(false);
    }
  };

  return (
    <main className={themeClasses.page}>
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <section className="rounded-3xl border border-[#2d4a1a]/20 bg-[#132d15]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]">
          <p className="text-sm uppercase tracking-[0.32em] text-[#8b7355]">Quick draw</p>
          <h1 className="mt-3 text-4xl font-black text-white">Point, capture, identify.</h1>
          <p className="mt-3 text-sm leading-6 text-[#d6c4ab]">
            Open the camera and snap the plant in front of you. The scan page is ready to capture a photo and identify it instantly.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#2d4a1a]/20 bg-[#10210f]/90 p-6 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.45)]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#2d4a1a]/20 bg-[#0f1e12]/90 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1f3811]/90 text-2xl">📷</span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#8b7355]">Camera ready</p>
                    <p className="text-sm text-[#d6c4ab]">Use your phone camera to capture the plant in front of you.</p>
                  </div>
                </div>
                {isMobile ? (
                  <>
                    <div className="overflow-hidden rounded-3xl border border-[#2d4a1a]/25 bg-black/60">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-72 w-full object-cover"
                      />
                    </div>
                    {cameraError ? (
                      <p className="mt-3 text-sm text-red-300">{cameraError}</p>
                    ) : (
                      <p className="mt-3 text-sm text-[#d6c4ab]">
                        {stream ? "Tap capture to take a photo." : "Allow camera access to use quick draw."}
                      </p>
                    )}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Button
                        variant="truxxii"
                        label={quickDrawLoading ? "Capturing..." : "Capture"}
                        onClick={capturePhoto}
                        disabled={quickDrawLoading || !stream}
                      />
                      <Button
                        variant="neutral"
                        label={cameraActive ? "Stop camera" : "Start camera"}
                        onClick={() => {
                          if (cameraActive) stopCamera();
                          else setCameraActive(true);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-[#2d4a1a]/20 bg-[#121f16]/90 p-5">
                    <p className="text-sm text-[#d6c4ab]">
                      Quick draw is optimized for mobile devices. Open True XXII on your phone to use the live camera flow, or upload an image from your computer here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-[#2d4a1a]/20 bg-[#0f1e12]/90 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1f3811]/90 text-2xl">📁</span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#8b7355]">Backup upload</p>
                    <p className="text-sm text-[#d6c4ab]">Or choose an existing image if your camera is unavailable.</p>
                  </div>
                </div>
                <label htmlFor="file-input" className={themeClasses.fileDropZone}>
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-lg font-semibold text-truexxii-dark mb-1">
                    {image ? "Change specimen" : "Choose a specimen"}
                  </p>
                  <p className="text-sm text-truexxii-dark/70">
                    {image ? image.name : "Tap to select an image from your device"}
                  </p>
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              {capturedImageUrl && (
                <div className="rounded-3xl border border-[#2d4a1a]/20 bg-[#0f1e12]/90 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#8b7355]">Capture preview</p>
                  <img src={capturedImageUrl} alt="Captured plant" className="mt-4 h-60 w-full rounded-3xl object-cover" />
                </div>
              )}
            </div>
          </div>

          {(quickDrawError || quickDrawResult || result || error) && (
            <div className="mt-6 rounded-3xl border border-[#2d4a1a]/20 bg-[#10210f]/90 p-5">
              {quickDrawError && <p className="text-sm text-red-300">{quickDrawError}</p>}
              {quickDrawResult && (
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#8b7355]">Quick draw result</p>
                  <p className="text-2xl font-black text-white">{quickDrawResult.plant_name}</p>
                  <p className="text-sm text-[#d6c4ab]">{quickDrawResult.description}</p>
                </div>
              )}
              {result && !quickDrawResult && (
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#8b7355]">Upload result</p>
                  <p className="text-2xl font-black text-white">{result}</p>
                  {scanData?.species && <p className="text-sm text-[#d6c4ab]">Scientific name: {scanData.species}</p>}
                  {scanData?.description && <p className="text-sm text-[#d6c4ab]">{scanData.description}</p>}
                </div>
              )}
              {error && !quickDrawError && <p className="text-sm text-red-300">{error}</p>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
