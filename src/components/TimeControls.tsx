import "./TimeControls.css";

interface TimeControlsProps {
  startTime: Date;
  endTime: Date;
  currentTime: Date;
  isPlaying: boolean;
  onSeek: (time: Date) => void;
  onPlayPause: () => void;
}

function formatUTCDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatUTCTime(date: Date): string {
  const h = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  return `${h}:${min}:${s} UTC`;
}

export function TimeControls({
  startTime,
  endTime,
  currentTime,
  isPlaying,
  onSeek,
  onPlayPause,
}: TimeControlsProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ms = Number(e.target.value);
    onSeek(new Date(ms));
  };

  return (
    <div className="time-controls">
      <button
        className="play-pause-btn"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <input
        type="range"
        className="time-slider"
        min={startTime.getTime()}
        max={endTime.getTime()}
        value={currentTime.getTime()}
        onChange={handleSliderChange}
        aria-label="Time slider"
      />
      <div className="time-display">
        <span className="time-date">{formatUTCDate(currentTime)}</span>
        <span className="time-utc">{formatUTCTime(currentTime)}</span>
      </div>
    </div>
  );
}
