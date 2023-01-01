// geolocation apiで取得できる経度と緯度の型を拡張して、nullを許容できるようにする
export type LatAndLon = {
  [key in keyof Pick<GeolocationCoordinates, 'latitude' | 'longitude'>]: number | null;
};
