import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sun, Quality, SunConfig, PLANE_SOURCES } from "@helioviewer/sun";
import CameraControls from "camera-controls";
import * as THREE from "three";
import type { CMEEvent } from "../types/cme.ts";
import { TimeControls } from "./TimeControls.tsx";
import "./CMEViewer.css";

SunConfig.model_path = "/resources/models/zit.glb";
CameraControls.install({ THREE });

interface SolarTimelapseProps {
  event: CMEEvent;
  onTimeUpdate: (time: Date) => void;
  onReady: () => void;
  isPlaying: boolean;
  seekTarget: Date | null;
  playbackSpeed: number;
}

function SolarTimelapse({
  event,
  onTimeUpdate,
  onReady,
  isPlaying,
  seekTarget,
  playbackSpeed,
}: SolarTimelapseProps) {
  const sunRef = useRef<InstanceType<typeof Sun> | null>(null);
  const currentTimeRef = useRef<number>(0);
  const readyRef = useRef(false);
  const { gl, camera } = useThree();
  const controlsRef = useRef<CameraControls | null>(null);

  useEffect(() => {
    const domElement = gl.domElement;
    const controls = new CameraControls(camera, domElement);
    const isPlane = PLANE_SOURCES.includes(event.sourceId);
    if (isPlane) {
      controls.setPosition(0, 0, 8);
    } else {
      controls.setPosition(0, 0, 3);
    }
    controlsRef.current = controls;
    return () => {
      controls.dispose();
    };
  }, [gl, camera, event.sourceId]);

  useEffect(() => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    const sun = new Sun(
      event.sourceId,
      start,
      end,
      event.cadenceSeconds,
      Quality.Low,
      (texture: THREE.Texture) => gl.initTexture(texture),
    );

    sunRef.current = sun;

    sun.ready.then(() => {
      readyRef.current = true;
      currentTimeRef.current = sun.range.start.getTime();
      onTimeUpdate(sun.range.start);
      onReady();
    });

    return () => {
      sun.dispose();
      sunRef.current = null;
      readyRef.current = false;
    };
  }, [event, gl, onReady, onTimeUpdate]);

  useEffect(() => {
    if (seekTarget && sunRef.current && readyRef.current) {
      currentTimeRef.current = seekTarget.getTime();
      sunRef.current.SetTime(seekTarget);
      onTimeUpdate(seekTarget);
    }
  }, [seekTarget, onTimeUpdate]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      controlsRef.current.update(delta);
    }

    if (!sunRef.current || !readyRef.current || !isPlaying) return;

    const sun = sunRef.current;
    currentTimeRef.current += playbackSpeed * delta;

    if (currentTimeRef.current > sun.range.end.getTime()) {
      currentTimeRef.current = sun.range.start.getTime();
    }

    const newTime = new Date(currentTimeRef.current);
    sun.SetTime(newTime);
    onTimeUpdate(newTime);
  });

  if (!sunRef.current) return null;
  return <primitive object={sunRef.current} />;
}

interface CMEViewerProps {
  event: CMEEvent;
  onBack: () => void;
}

export function CMEViewer({ event, onBack }: CMEViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date(event.startTime),
  );
  const [seekTarget, setSeekTarget] = useState<Date | null>(null);
  const playbackSpeed = 3600000; // 1 hour of solar time per real second

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  const handleTimeUpdate = useCallback((time: Date) => {
    setCurrentTime(time);
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleSeek = useCallback((time: Date) => {
    setSeekTarget(time);
    setCurrentTime(time);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="cme-viewer">
      <div className="viewer-header">
        <button
          className="back-btn"
          onClick={onBack}
          aria-label="Back to list"
        >
          &larr; Back
        </button>
        <div className="viewer-event-info">
          <span className="viewer-event-name">{event.name}</span>
          <span className="viewer-event-flare">{event.flareClass}</span>
        </div>
      </div>

      {!isReady && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <p>Loading solar imagery...</p>
        </div>
      )}

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <SolarTimelapse
            event={event}
            onTimeUpdate={handleTimeUpdate}
            onReady={handleReady}
            isPlaying={isPlaying}
            seekTarget={seekTarget}
            playbackSpeed={playbackSpeed}
          />
        </Canvas>
      </div>

      <TimeControls
        startTime={startTime}
        endTime={endTime}
        currentTime={currentTime}
        isPlaying={isPlaying}
        onSeek={handleSeek}
        onPlayPause={handlePlayPause}
      />
    </div>
  );
}
