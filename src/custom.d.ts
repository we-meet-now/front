declare module '*.svg?react' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare namespace naver.maps {
  class Map {
    constructor(el: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setZoom(zoom: number): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: {
      position?: number;
    };
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  const Position: {
    TOP_RIGHT: number;
    RIGHT_CENTER: number;
    BOTTOM_RIGHT: number;
  };
}
