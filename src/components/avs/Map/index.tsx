import { Map as MapGL, Source, Layer, LayerProps } from "react-map-gl";
import * as turf from "@turf/turf";
import { useState } from "react";

interface Props {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Map = ({ coordinates }: Props) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Generate a circular polygon with a 1 km radius
  const circle = turf.circle([coordinates.longitude, coordinates.latitude], 1, {
    steps: 64, // Defines the smoothness of the circle
    units: "kilometers",
  });

  const geoJSON = {
    type: "FeatureCollection",
    features: [circle],
  };

  const fillLayer: LayerProps = {
    id: "circle-fill-layer",
    type: "fill" as const,
    paint: {
      "fill-color": "#007AFF",
      "fill-opacity": 0.3,
    },
  };

  return (
    <MapGL
      initialViewState={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        zoom: 12,
      }}
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/standard"
      mapboxAccessToken="pk.eyJ1IjoiYmxpdHpraGFsZWQiLCJhIjoiY20zM3lpMmM0MWlxdTJtczhvajd6aGh1eSJ9.ceAicGYUTa-5nzWjLH6-1g"
      onLoad={() => setMapLoaded(true)} // Wait for the map to load
    >
      {mapLoaded && (
        <Source id="circle-source" type="geojson" data={geoJSON}>
          <Layer {...fillLayer} />
        </Source>
      )}
    </MapGL>
  );
};

export default Map;
