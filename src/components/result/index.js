import React from 'react';

import Navbar from '../shared/navbar';
import Resultcontent from './resultcontent';
import Resultheader from './resultheader';
import { connect } from 'react-redux';

 class Result extends React.Component {

    render() {
        return (
            <div id="wrapper">
             <Navbar />
             <Resultheader coordinates = {this.props.coordinates} townpos={this.props.townpos} stops={this.props.stops} />
             <Resultcontent stops = {this.props.stops} coordinates = {this.props.coordinates} townpos={this.props.townpos}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return{
        coordinates: state.coordinates,
        townpos: state.townpos,
        stops: state.stops
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);