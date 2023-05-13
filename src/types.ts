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
  models: Model[];
}

export interface Model {
  name: string;
  id: string;
}

export interface LngLat {
  lng: number;
  lat: number;
}

export interface Tool {
  name: string;
  icon: any;
  active: boolean;
  action: (...args: any) => void;
}

export interface Floorplan {
  name: string;
  id: string;
}

export interface Property {
  name: string;
  value: string;
}
