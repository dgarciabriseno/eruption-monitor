export class Sun {
  ready = Promise.resolve();
  source = 4;
  _time = new Date();

  get time() {
    return this._time;
  }
  get range() {
    return { start: new Date("2003-10-28T10:30:00Z"), end: new Date("2003-10-28T16:30:00Z") };
  }
  get count() {
    return 18;
  }

  SetTime(date: Date) {
    this._time = date;
  }
  dispose() {}
}

export class StaticSun {
  ready = Promise.resolve();
  dispose() {}
}

export const Quality = {
  Low: { resolution: 512, format: "jpg" },
  Default: { resolution: 1024, format: "png" },
  High: { resolution: 2048, format: "png" },
  Maximum: { resolution: 4096, format: "png" },
};

export class SunConfig {
  static model_path = "/resources/models/zit.glb";
}

export const PLANE_SOURCES = [4, 5, 28, 29, 30, 31, 83, 131];

export function SetHelioviewerApiUrl() {}
