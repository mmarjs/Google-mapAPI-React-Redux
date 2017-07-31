import React from 'react';
import Knokke from './knokke';
import Depanne from './depanne';

export default class Resultcontent extends React.Component {

    constructor() {
        super();
        this.state = {
            knokkes: [],
            depannes: []
        }
    }

    componentDidMount() {

        let coordinates = [];
        let coordinates00 = [];
        let coordinates01 = [];

        coordinates = this.props.coordinates;
        coordinates00 = coordinates[0]['dir_00'];
        coordinates01 = coordinates[0]['dir_01'];

        this.setState({knokkes: coordinates00})
        this.setState({depannes: coordinates01})

    }

    render() {
        return (

            <div className="container">
                <Knokke townpos={this.props.townpos} knokkes={this.state.knokkes} />
                <Depanne townpos={this.props.townpos} depannes={this.state.depannes} />
                <div className="result_main_bottom clearfix">
                    <div className="result_main_bottom_left pull-left col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="result_main_bottom_left_img"><img src="images/result-btm-img.png" alt="img" /></div>
                        <div className="result_main_bottom_right">
                            <h2>Dienstregeling</h2>
                            <p>Tijdens de zomer is er een tram elke 10 minuten</p>
                        </div>
                    </div>
                    <div className="result_main_bottom_left pull-right col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{ borderLeft: 'solid 1px #ffffff' }}>
                        <div className="result_main_bottom_left_img"><img src="images/logo.png" width="47" height="41" alt="logo" /></div>
                        <div className="result_main_bottom_right">
                            <h2>Dichtstbijzijnde Lijnwinkel</h2>
                            <p>Lijnwinkel Oostende (nabij NMBS-station) <br /> br /andariskaai 2 · 8400 Ostende </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}