import { Marker, Map as MapGL } from "react-map-gl";

interface Props {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Map = ({ coordinates }: Props) => {
  return (
    <MapGL
      initialViewState={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        zoom: 14,
      }}
      style={{ width: "100%", height: "500px", borderRadius: 26 }} // Width is responsive, height is fixed
      mapStyle="mapbox://styles/mapbox/standard"
      mapboxAccessToken="pk.eyJ1IjoiYmxpdHpraGFsZWQiLCJhIjoiY20zM3lpMmM0MWlxdTJtczhvajd6aGh1eSJ9.ceAicGYUTa-5nzWjLH6-1g"
    >
      <Marker
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
      />
    </MapGL>
  );
};
export default Map;
