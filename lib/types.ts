export type FilterType =
  | "original"
  | "bw"
  | "mono"
  | "warm"
  | "cool"
  | "vintage"
  | "film"
  | "fade";

export type LayoutType = "classic" | "double" | "grid" | "polaroid";

export type PaperType = "white" | "cream" | "black" | "soft-pink" | "soft-blue";

export type PaperDecorationType = "plain" | "stamp" | "hearts" | "tape" | "film";

export type BoothSession = {
  photos: string[];
  filter: FilterType;
  layout: LayoutType;
  timer: number;
  captureCount: number;
  paper: PaperType;
  paperDecoration: PaperDecorationType;
  caption?: string;
  showDate: boolean;
};

export type CameraDevice = {
  deviceId: string;
  label: string;
};
