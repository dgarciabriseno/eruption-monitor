import { useState } from "react";
import type { CMEEvent } from "./types/cme.ts";
import { CMEList } from "./components/CMEList.tsx";
import { CMEViewer } from "./components/CMEViewer.tsx";
import "./App.css";

function App() {
  const [selectedEvent, setSelectedEvent] = useState<CMEEvent | null>(null);

  if (selectedEvent) {
    return (
      <CMEViewer
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
      />
    );
  }

  return (
    <div className="app">
      <CMEList onSelect={setSelectedEvent} />
    </div>
  );
}

export default App;
