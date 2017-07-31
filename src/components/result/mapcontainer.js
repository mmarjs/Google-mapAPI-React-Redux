import React from 'react';
import Map from './map.js';

export default class MapContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			markers: [],
			scrollwheel: false,
			showInfo: false
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
		else {
			this.setState({
				markers: this.state.markers.map(marker => {
					if (marker === targetMarker) {
						return {
							...marker,
							showInfo: false,
						};
					}
					return marker;
				}),
			});
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
	componentDidMount() {

		// let coordinates00 = [];
		// let coordinates01 = [];
		// let coordinates001 = [];
		// let coord = [];
		// let coordinates = [];
		let stops = [];
		let stops00 = [];

		stops = this.props.stops;
		// let stop_leng = stops.length / 2 - 1;
		// coordinates00 = this.props.coordinates[0]['dir_00'];
		// coordinates01 = this.props.coordinates[0]['dir_01'];

		// coord = coordinates00.concat(coordinates01);

		// coord.map((coordinate, index) => {
		// 	if (coordinate.itemPosition.direction_id === 5501) {
		// 		let stop_seq= stop_leng-coordinate.itemPosition.stop_seq;

		// 		let position1 = {
		// 			itemPosition: {
		// 				direction_id: 5501,
		// 				timing: coordinate.itemPosition.timing,
		// 				lat: coordinate.itemPosition.lat,
		// 				lng: coordinate.itemPosition.lng,
		// 				stop_name: coordinate.itemPosition.stop_name,
		// 				stop_seq: stop_seq,
		// 				url: coordinate.itemPosition.url,
		// 				image_url: coordinate.itemPosition.image_url,
		// 				event_name: coordinate.itemPosition.name
		// 			},
		// 			key: index
		// 		}
		// 		 coordinates001.push(position1);
		// 	}
		// 	return coordinates001;
		// })
		// coordinates = coordinates00.concat(coordinates001);

		let stopfilter = [];
		stopfilter = this.props.stops.filter(stop => (stop.id === this.props.townpos.stop_id && stop.direction_id === 5500))

		let towntemp = {
			position: {
				lat: this.props.townpos.lat,
				lng: this.props.townpos.lng
			},
			des: this.props.townpos.des,
			stop: this.props.townpos.stop,
			stop_seq: stopfilter[0].stop_sequence,
			icon: {
				path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				scale: 7,
				fillColor: 'green',
				strokeColor: 'green',
				fillOpacity: 1,
				strokeOpacity: 1,
				rotation: this.props.townpos.heading,
			},
		};

		this.setState({ townMarker: towntemp });

		// let markers = [];

		// coordinates.map((coordinate, index) => {

		// 	let temp = {
		// 		position: {
		// 			lat: coordinate.itemPosition.lat,
		// 			lng: coordinate.itemPosition.lng,
		// 		},
		// 		stop_name: coordinate.itemPosition.stop_name,
		// 		stop_seq: coordinate.itemPosition.stop_seq,
		// 		key: index
		// 	}
		// 	 return markers.push(temp);

		// });
		// this.setState({ markers });

		let markers = [];
		stops00 = stops.filter(stop => stop.direction_id === 5500);
		stops00.sort(function (a, b) { return (a.stop_sequence > b.stop_sequence) ? 1 : ((b.stop_sequence > a.stop_sequence) ? -1 : 0); });

		stops00.map((item, index) => {
			let temp = {
				position: {
					lat: item.latitude,
					lng: item.longitude
				},
				name: item.name,
				stop_seq: item.stop_sequence
			}
			return markers.push(temp);
		})
		this.setState({ markers })

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
					markers={this.state.markers}
					townMarker={this.state.townMarker}

					onMarkerClick={this.handleMarkerClick}
					onMarkerClose={this.handleMarkerClose}
					showInfo={this.state.showInfo}

					options={this.state.scrollwheel}
					onMarkerRightClick={this.handleMarkerRightClick}
				/>
			</div>
		);
	}
}
