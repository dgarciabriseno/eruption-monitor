import type { CMEEvent } from "../types/cme.ts";
import cmeEvents from "../data/cmeEvents.ts";
import "./CMEList.css";

interface CMEListProps {
  onSelect: (event: CMEEvent) => void;
}

export function CMEList({ onSelect }: CMEListProps) {
  return (
    <div className="cme-list-container">
      <h1 className="cme-list-title">Solar Eruption Monitor</h1>
      <p className="cme-list-subtitle">
        Notable coronal mass ejections observed by SOHO over 30 years
      </p>
      <ul className="cme-list" role="list">
        {cmeEvents.map((event) => (
          <li
            key={event.id}
            className="cme-list-item"
            onClick={() => onSelect(event)}
          >
            <div className="cme-item-header">
              <span className="cme-item-name">{event.name}</span>
              <span className="cme-item-flare">{event.flareClass}</span>
            </div>
            <span className="cme-item-date">{event.date}</span>
            <p className="cme-item-description">{event.description}</p>
            <p className="cme-item-source">
              Source:{" "}
              <a
                href={event.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {event.source}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
