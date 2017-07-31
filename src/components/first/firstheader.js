import React from 'react';
import MapContainer from './mapcontainer';
import { connect } from 'react-redux';
import * as townsActions from '../../actions/townsActions';
import DatePicker from 'react-datepicker';
import Autocomplete from 'react-google-autocomplete';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Firstheader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            // startDate1: moment(),
            // startDate2: moment(),
            start_date: '',
            end_date: '',
            index: 0
        };

        this.lat = "";
        this.lng = "";
        this.description = "";
        this.stop = "";
        this.stop_id = "";
        this.index = "";
        // this.start_date="";
        // this.end_date="";
    }
    Change1 = (date) => {
        this.setState({
            start_date: date
        });
    }
    Change2 = (date) => {
        this.setState({
            end_date: date
        });
    }


    handleChange = (e) => {

        this.index = e.target.selectedIndex;
        this.setState({
            index: this.index
        })
        this.lat = this.props.towns[this.index - 1].latitude;
        this.lng = this.props.towns[this.index - 1].longitude;
        this.description = this.props.towns[this.index - 1].description;
        this.stop = this.props.towns[this.index - 1].name;
        this.stop_id = this.props.towns[this.index - 1].stop_id;

    }
    onShowTown = () => {

        if (this.state.index === 0) {
            alert("please select a town")
        }
        if (this.state.start_date === '' || this.state.end_date === '') {
            alert("Please select both start date and end date")
        }

        if (new Date(this.state.start_date).getTime() >= new Date(this.state.end_date).getTime()) {
            alert("Please select the end date greater than start date")
        }

        if (this.state.index > 0 && new Date(this.state.start_date).getTime() < new Date(this.state.end_date).getTime() && this.state.start_date !== undefined && this.state.end_date !== undefined) {

            let townpos = { index: this.index, lat: this.lat, lng: this.lng, des: this.description, stop: this.stop, stop_id: this.stop_id, start_date: new Date(this.state.start_date).getTime(), end_date: new Date(this.state.end_date).getTime() }
            this.props.selectTown(townpos);
        }
    }

    render() {
        // moment.locale("fr");
        return (
            <div className="map">
                <MapContainer events={this.props.events} townpos={this.props.townpos} />
                <div className="container">
                    <div className="about_us">
                        <h5><span>Mijn lijn</span> laat me proeven van al het beste van de Kust</h5>
                        <label>Mijn vertrekpunt</label>
                        <select onChange={this.handleChange}>

                            <option style={{ display: 'none' }}></option>
                            {
                                this.props.towns.map((town, index) => {
                                    return (
                                        <option value={index} key={index}>{town.description}</option>
                                    );
                                })
                            }

                        </select>
                        {/* <Autocomplete
                            style={{ width: '90%' }}
                            onPlaceSelected={(place) => {
                                console.log(place);
                            }}
                            types={['(regions)']}
                        />  */}
                        <label>ik ben aan de kust van</label>
                        <DatePicker id="start"
                            dateFormat="YYYY-MM-DD"
                            placeholderText="Start Date"
                            selected={this.state.start_date}
                            onChange={this.Change1}
                        />
                        <img src="images/aerrow.png" alt="arrow-img" />
                        <DatePicker id="end"
                            dateFormat="YYYY-MM-DD"
                            placeholderText="End Date"
                            selected={this.state.end_date}
                            onChange={this.Change2}
                        />
                        <div className="clearfix">
                            <button onClick={this.onShowTown}>mijn persoonlijke tips</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        towns: state.towns,
        townpos: state.townpos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTown: (townpos) => dispatch(townsActions.selectTown(townpos)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Firstheader);