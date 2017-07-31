import React from 'react';
import { GoogleMap, InfoWindow, Marker, Polyline, withGoogleMap } from 'react-google-maps';

const Map = withGoogleMap((props) => {

    let points = [];
    let townMarker = props.townMarker;

    let tempTown = {
        lat: townMarker.position.lat,
        lng: townMarker.position.lng,
        stop_seq: townMarker.stop_seq
    };

    // props.markers.map((marker, index) => {

    //     let temp = {
    //         lat: marker.position.lat,
    //         lng: marker.position.lng,
    //         stop_seq: marker.stop_seq
    //     };
    //     return points.push(temp);

    // })
    props.markers.map((marker, index) => {

        let temp = {
            lat: marker.position.lat,
            lng: marker.position.lng,
            stop_seq: marker.stop_seq
        };
        return points.push(temp);

    })
    points.push(tempTown)
    points.sort(function (a, b) { return (a.stop_seq > b.stop_seq) ? 1 : ((b.stop_seq > a.stop_seq) ? -1 : 0); });

    return (

        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={10}
            defaultCenter={{ lat: townMarker.position.lat, lng: townMarker.position.lng }}
            onClick={props.onMapClick}
            options={{ scrollwheel: props.options }}
        >
            {props.markers && props.markers.map((marker, index) => (
                <Marker key={index} position={marker.position} icon={{
                    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                    scale: 1.5,
                    fillColor: 'red',
                    strokeColor: 'red',
                    fillOpacity: 0.5,
                    strokeOpacity: 1,
                }} onClick={(e) => props.onMarkerClick(marker)}>
                    {
                        marker.showInfo && (
                            <InfoWindow onCloseClick={(e) => props.onMarkerClose(marker)}>
                                {/* <div>{marker.stop_name}</div> */}
                                <div>{marker.name}</div>
                            </InfoWindow>
                        )}
                </Marker>
            ))}
            {props.townMarker &&
                <Marker {...props.townMarker} onClick={() => props.onMarkerClick(props.townMarker)}>
                    {props.showInfo && (
                        <InfoWindow onCloseClick={() => props.onMarkerClose(props.townMarker)}>
                            <div>{props.townMarker.des}<br />{props.townMarker.stop}</div>
                        </InfoWindow>
                    )}
                </Marker>
            }
            <Polyline options={{ strokeColor: "#ef0707", strokeWeight: "6" }}
                path={points} />

        </GoogleMap>
    );
});

export default Map;

