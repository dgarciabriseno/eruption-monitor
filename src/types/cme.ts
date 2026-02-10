export interface CMEEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  cadenceSeconds: number;
  sourceId: number;
  flareClass: string;
  description: string;
  earthEffects: string;
  source: string;
  sourceUrl: string;
}
