import React from 'react';

import Map from './map.js';

export default class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			townMarker: {},
			scrollwheel: false,
			showInfo: false,
		};
	}
	handleMarkerClick = (targetMarker) => {
		if (this.state.townMarker === targetMarker) {
			this.setState({
				showInfo: true,
			})
		}
		else {
			this.setState({
				markers: this.state.markers.map(marker => {
					if (marker === targetMarker) {
						return {
							...marker,
							showInfo: true,
						};
					} else {
						return {
							...marker,
							showInfo: false,
						};
					}
				}),
			});
		}
	}

	handleMarkerClose = (targetMarker) => {
		if (this.state.townMarker === targetMarker) {
			this.setState({
				showInfo: false
			})
		}
	}

	handleMapClick = (e) => {

		if (this.state.scrollwheel === false) {
			this.setState({
				scrollwheel: true
			});
		}
		else {
			this.setState({
				scrollwheel: false
			});
		}

	}

	componentWillReceiveProps(nextProps) {

		let towntemp = {
			position: {
				lat: nextProps.townpos.lat,
				lng: nextProps.townpos.lng
			},
			stop: nextProps.townpos.stop,
			icon: {
				path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				scale: 7,
				fillColor: 'green',
				strokeColor: 'green',
				fillOpacity: 1,
				strokeOpacity: 1,
				rotation: nextProps.townpos.heading,
			},
		};

		this.setState({ townMarker: towntemp });


		let markers = [];

		nextProps.events.map((event, index) => {

			let temp = {
				position: {
					lat: event.latitude,
					lng: event.longitude,
				},
				stopname: event.stops[0].name,
				event_name: event.name,
				key: index
			};

			return markers.push(temp);

		});
		this.setState({ markers });
	}

	render() {

		return (
			<div style={{ height: '70vh' }}>
				<Map
					containerElement={
						<div style={{ height: '100%' }} />
					}
					mapElement={
						<div style={{ height: '100%' }} />
					}

					onMapLoad={this.handleMapLoad}
					onMapClick={this.handleMapClick}
					onMarkerClick={this.handleMarkerClick}
					onMarkerClose={this.handleMarkerClose}
					showInfo={this.state.showInfo}
					markers={this.state.markers}
					townMarker={this.state.townMarker}
					options={this.state.scrollwheel}

				/>
			</div>
		);
	}
}
