export interface GisParameters {
  container: HTMLDivElement;
  accessToken: string;
  zoom: number;
  center: [number, number];
  pitch: number;
  bearing: number;
  buildings: Building[];
}

export interface Building {
  uid: string;
  lat: number;
  lng: number;
  userID: string;
  name: string;
}

export interface LngLat {
  lng: number;
  lat: number;
}

export interface Tool {
  name: string;
  icon: any;
  action: (...args: any) => void;
}
