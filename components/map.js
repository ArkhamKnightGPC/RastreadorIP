import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = ({ latitude, longitude }) => {
  const DEFAULT_LATITUDE = 40.65;
  const DEFAULT_LONGITUDE = -73.95;
  const mapLat = latitude ? latitude : DEFAULT_LATITUDE;
  const mapLng = longitude ? longitude : DEFAULT_LONGITUDE;

  return (
    <MapContainer center={[mapLat, mapLng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[mapLat, mapLng]}>
        <Popup>
          Latitude: {mapLat} <br />
          Longitude: {mapLng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

MyMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MyMap;
