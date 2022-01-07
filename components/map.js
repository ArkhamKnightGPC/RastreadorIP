import PropTypes from 'prop-types'
import styles from '../styles/Map.module.css'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvent} from 'react-leaflet'

function UpdateMap({latitude, longitude}){
    const map = useMapEvent('click', () => {
        map.setCenter([latitude, longitude])
    })
    return null
}

export default function MyMap({latitude, longitude}){
    const DEFAULT_LATITUDE = 51.505
    const DEFAULT_LONGITUDE = -0.09
    const mapLat = latitude ? latitude : DEFAULT_LATITUDE
    const mapLng = longitude ? longitude : DEFAULT_LONGITUDE

    return (
        <div id={styles.map}>
            <h1>Say something, I'm giving up on you!</h1>
            <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

MyMap.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}
/*
<UpdateMap latitude={mapLat} longitude={mapLng} />
<TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
*/