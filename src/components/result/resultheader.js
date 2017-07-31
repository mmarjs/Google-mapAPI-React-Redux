import React from 'react';
import MapContainer from './mapcontainer';

export default class Resultheader extends React.Component {

    render() {
        return (
            <div className="map">
                <MapContainer coordinates={this.props.coordinates} townpos={this.props.townpos} stops={this.props.stops} />
            </div>
        );
    }
}