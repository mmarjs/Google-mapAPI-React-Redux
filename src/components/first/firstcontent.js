import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as eventsActions from '../../actions/eventsActions';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import SidebaritemText from '../shared/sidebaritemimage'

const SliderWithTooltip = createSliderWithTooltip(Slider);

class Firstcontent extends React.Component {

    constructor() {
        super();

        this.state = {
            limitNum: 10,
            isCheckedKids: false,
            isCheckedIndoor: false,
            isChecked: [],
            events_sum: [],
            knokkes: [],
            depannes: [],
            events: [],
            filter_distance: 0,
        }
    }

    componentWillReceiveProps(nextProps) {

        let stops = [];
        let townpos = [];
        let dates_events = [];
        let eventsReal = [];
        let town_seq0 = [];
        let town_seq1 = 0;
        let events_sum = [];
        let stops0_filter = [];
        let stops0_srt = [];
        let stops1_filter = [];
        let stops1_srt = [];
        let stop_leng = 0;
        let knokkes = [];
        let depannes = [];
        townpos = nextProps.townpos;

        nextProps.events.map((event, index) => {
            let eventItem = {
                url: event.url,
                image_url: event.image_url,
                stop_name: event.stops[0].name,
                name: event.name,
                description: event.description,

            }
            return eventsReal.push(eventItem);
        })
        this.setState({ events: eventsReal });


        stops = nextProps.stops;

        if (Object.keys(townpos).length > 0 && townpos.start_date !== undefined && townpos.end_date !== undefined) {

            dates_events = nextProps.events.filter(event => event.period_type === 2 && new Date((event.period.start_date).split(' ')[0]).getTime() >= townpos.start_date && new Date((event.period.end_date).split(' ')[0]).getTime() < townpos.end_date)
            console.log("DATES", dates_events)

            if (dates_events.length !== 0) {

                this.setState({
                    flag: true
                })

                stop_leng = stops.length / 2 - 1;
                // stop_sequence of the selected town in 5500
                town_seq0 = stops.filter(stop => (stop.id === townpos.stop_id))

                // stop_sequence of the selected town in depanne
                town_seq1 = stop_leng - town_seq0[0].stop_sequence;

                //all stops in knokke direction
                stops0_filter = stops.filter(stop => (stop.direction_id === 5500 && stop.stop_sequence >= town_seq0[0].stop_sequence))
                stops0_srt = stops0_filter.sort(function (a, b) { return (a.stop_sequence > b.stop_sequence) ? 1 : ((b.stop_sequence > a.stop_sequence) ? -1 : 0); });

                // //all stops in de panne direction

                stops1_filter = stops.filter(stop => (stop.direction_id === 5501 && stop.stop_sequence >= town_seq1))
                stops1_srt = stops1_filter.sort(function (a, b) { return (a.stop_sequence > b.stop_sequence) ? 1 : ((b.stop_sequence > a.stop_sequence) ? -1 : 0); });

                dates_events.map((event, index) => {

                    let event0 = [];
                    event0 = event.stops.filter(stop => stop.direction_id === 5500)
                    let event1 = [];
                    event1 = event.stops.filter(stop => stop.direction_id === 5501)

                    if (event0[0].stop_sequence > town_seq0[0].stop_sequence) {

                        let stops_filter = [];
                        stops_filter = stops0_srt.filter(item => item.stop_sequence < event0[0].stop_sequence)

                        let sum_timing = 0;
                        stops_filter.map((item, index) => {

                            return sum_timing += item.time_to_next;
                        })

                        let dLat = Math.abs(townpos.lat - event0[0].latitude) * (Math.PI / 180);
                        let dLon = Math.abs(townpos.lng - event0[0].longitude) * (Math.PI / 180);
                        let a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(townpos.lat * (Math.PI / 180)) * Math.cos(event0[0].latitude * (Math.PI / 180)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2)
                            ;
                        let distance = 2 * 6371 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        console.log("DISTANCE1", distance)

                        let itemKnokke = {
                            lat: event0[0].latitude,
                            lng: event0[0].longitude,
                            distance: distance,
                            direction_id: 5500,
                            point_type: event.point_type,
                            timing: sum_timing,
                            child_friendly: event.child_friendly,
                            location_type: event.location_type,
                            stop_name: event0[0].name,
                            stop_seq: event0[0].stop_sequence,
                            url: event.url,
                            image_url: event.image_url,
                            name: event.name
                        }
                        knokkes.push(itemKnokke);
                    }


                    if (event1[0].stop_sequence > town_seq1) {

                        let stops_filter = [];
                        stops_filter = stops1_srt.filter(item => item.stop_sequence < event1[0].stop_sequence)

                        let sum_timing = 0;
                        stops_filter.map((item, index) => {

                            return sum_timing += item.time_to_next;
                        })

                        let dLat = Math.abs(townpos.lat - event1[0].latitude) * (Math.PI / 180);
                        let dLon = Math.abs(townpos.lng - event1[0].longitude) * (Math.PI / 180);
                        let a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(townpos.lat * (Math.PI / 180)) * Math.cos(event1[0].latitude * (Math.PI / 180)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2)
                            ;
                        let distance = 2 * 6371 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        console.log("DISTANCE2", distance)

                        let itemDepanne = {
                            lat: event1[0].latitude,
                            lng: event1[0].longitude,
                            distance: distance,
                            direction_id: 5501,
                            point_type: event.point_type,
                            timing: sum_timing,
                            child_friendly: event.child_friendly,
                            location_type: event.location_type,
                            stop_name: event1[0].name,
                            stop_seq: event1[0].stop_sequence,
                            url: event.url,
                            image_url: event.image_url,
                            name: event.name
                        }
                        depannes.push(itemDepanne);
                    }
                    events_sum = knokkes.concat(depannes);
                    console.log("SUM")
                    return events_sum;
                })
                events_sum.sort(function (a, b) { return (a.timing > b.timing) ? 1 : ((b.timing > a.timing) ? -1 : 0); });
                this.setState({
                    events_sum: events_sum
                })
            } else {
                this.setState({
                    flag: false
                })
                this.setState({
                    events_sum: []
                })
            }
        }
    }
    distanceDisplay = (v) => {
        return `${v}`;
    }
    sliderChange = (value) => {
        this.setState({ filter_distance: value })
    }
    showMore = () => {

        this.setState({
            limitNum: this.state.limitNum + 10,
        });

        let events_realleng = this.props.events.length;
        let events_leng = this.props.events.length / 10;

        if (this.state.limitNum === (events_leng * 10)) {

            this.setState({
                limitNum: events_realleng,
            })
        }
        if (this.state.limitNum > events_realleng) {
            this.setState({
                limitNum: 10
            })
        }
    }

    onClickKids = (e) => {
        this.setState({ isCheckedKids: e.target.checked });
    }

    onClickIndoor = (e) => {
        this.setState({ isCheckedIndoor: e.target.checked });
    }

    onClickCheckBox = (e, index) => {

        let coordinates = [];
        let coordinates00 = [];
        let coordinates01 = [];

        let temp = this.state.isChecked;

        temp[index] = !temp[index];

        this.setState({ isChecked: temp });

        temp.map((item, index) => {

            if (temp[index]) {
                if (this.state.events_sum[index].direction_id === 5500) {
                    let position0 = {
                        itemPosition: {
                            direction_id: 5500,
                            timing: this.state.events_sum[index].timing,
                            point_type: this.state.events_sum[index].point_type,
                            lat: this.state.events_sum[index].lat,
                            lng: this.state.events_sum[index].lng,
                            stop_name: this.state.events_sum[index].stop_name,
                            stop_seq: this.state.events_sum[index].stop_seq,
                            url: this.state.events_sum[index].url,
                            image_url: this.state.events_sum[index].image_url,
                            event_name: this.state.events_sum[index].name
                        },
                        key: index
                    }
                    coordinates00.push(position0);
                    coordinates00.sort(function (a, b) { return (a.timing > b.timing) ? 1 : ((b.timing > a.timing) ? -1 : 0); });
                }

                if (this.state.events_sum[index].direction_id === 5501) {
                    let position1 = {
                        itemPosition: {
                            direction_id: 5501,
                            timing: this.state.events_sum[index].timing,
                            point_type: this.state.events_sum[index].point_type,
                            lat: this.state.events_sum[index].lat,
                            lng: this.state.events_sum[index].lng,
                            stop_name: this.state.events_sum[index].stop_name,
                            stop_seq: this.state.events_sum[index].stop_seq,
                            url: this.state.events_sum[index].url,
                            image_url: this.state.events_sum[index].image_url,
                            event_name: this.state.events_sum[index].name
                        },
                        key: index
                    }
                    coordinates01.push(position1);
                    coordinates01.sort(function (a, b) { return (a.timing > b.timing) ? 1 : ((b.timing > a.timing) ? -1 : 0); });
                }
            }
            let array_plus = {
                dir_00: coordinates00,
                dir_01: coordinates01
            }
            return coordinates.push(array_plus);

        })

        this.props.selectEventsSuccess(coordinates);

    }

    render() {
        let events = [];

        if (this.state.flag === true) {
            console.log("events_sum", this.state.events_sum)

            events = this.state.events_sum;
            if (this.state.isCheckedKids) {
                events = events.slice(0, this.state.limitNum).filter(event => event.child_friendly);
            }
            if (this.state.isCheckedIndoor) {
                events = events.filter(event => event.location_type === 1)
            }
            if (this.state.filter_distance > 0) {
                events = events.filter(event => event.distance <= this.state.filter_distance)
            }
        }
        if (this.state.flag === false) {
           events=this.state.events_sum;
        }

        if (this.state.flag === undefined) {
            events = this.state.events;
            if (this.state.isCheckedKids) {
                events = events.slice(0, this.state.limitNum).filter(event => event.child_friendly);
            }
            if (this.state.isCheckedIndoor) {
                events = events.filter(event => event.location_type === 1)
            }
        }

        return (
            <div className="mian_content">
                <div className="container">
                    <div className="attraction_width">
                        <div className="attraction clearfix">
                            <div className="attraction-left  col-sm-4 col-md-4 col-xs-12 left_width">
                                <div className="left_content_width">
                                    <div className="left_content">

                                        <div className="all_location_detail">
                                            <div className="my_location_detail">
                                                <img src="images/location.png" alt="location-img" />
                                                <div className="my_location_info">
                                                    <strong>Mijn locatie</strong>
                                                    <p>{this.props.townpos.des}</p>
                                                </div>
                                            </div>
                                            <div className="my_location_detail">
                                                <img src="images/socket.png" alt="socket-img" />
                                                <div className="my_location_info">
                                                    <strong>Mijn halte</strong>
                                                    <p>{this.props.townpos.stop}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="filters">
                                        <h3>Filters</h3>
                                        <div className="filters-kids">
                                            <input name="gender1" type="checkbox" id="inlineCheckbox_kids" onClick={this.onClickKids} />
                                            {this.state.isCheckedKids &&
                                                <label className="checked" htmlFor="inlineCheckbox_kids">Leuk met kids</label>
                                            }
                                            {!this.state.isCheckedKids &&
                                                <label htmlFor="inlineCheckbox_kids">Leuk met kids</label>
                                            }
                                            <div className="clear"></div>
                                        </div>
                                        <div className="filters-indoor">
                                            <input name="gender2" type="checkbox" id="inlineCheckbox_indoor" onClick={this.onClickIndoor} />
                                            {this.state.isCheckedIndoor &&
                                                <label className="checked" htmlFor="inlineCheckbox_indoor">Indoor activiteiten</label>
                                            }
                                            {!this.state.isCheckedIndoor &&
                                                <label htmlFor="inlineCheckbox_indoor">Indoor activiteiten</label>
                                            }
                                            <div className="clear"></div>
                                        </div>
                                        <p>Maximumafstand :   <span>40 Km</span></p>
                                        <div className="speed_limit">
                                            <img src="images/train.png" alt="train-img" />
                                            <SliderWithTooltip min={0} max={40} style={{ paddingTop: '10px' }}
                                                tipFormatter={this.distanceDisplay}
                                                tipProps={{ overlayClassName: 'foo' }}
                                                onAfterChange={this.sliderChange}
                                            />
                                        </div>
                                    </div>
                                    <SidebaritemText title="Doe niet als Onni" imagePath="images/image.png" imageAlt="panda" text="Geniet van de kust, maar heb ook aandacht voor de Kusttram!" linkText="lees meer" linkUrl="/onni" />
                                    <div className="coupan_code">
                                        <div className="coupan_img"><img src="images/coupan.png" alt="coupan-img" /></div>
                                        <p>Gemakkelijk reizen met een</p>
                                        <span>dagpas</span>
                                        <div className="know_more"><a href="https://www.delijn.be/nl/vervoerbewijzen/ritkaarten-dagpassen/dagpas.html" target="_blank" rel="noopener noreferrer">lees meer</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-right  col-sm-8 col-md-8 col-xs-12">
                                <div className="all_attraction clearfix">
                                    <h4>Jouw events en attracties in de buurt</h4>
                                    <div className="attraction_border">&nbsp;</div>

                                    {
                                        events.slice(0, this.state.limitNum).map((event, index) => {
                                            return (
                                                <div className="attraction_post" key={event.id}>
                                                    <div className="attraction_post_left col-md-8 col-sm-8  col-xs-12" >
                                                        <div className="post_content">
                                                            <h6>EVENT <strong>· Kusttram+ partner</strong></h6>
                                                            <div>
                                                                <input name="gender" type="checkbox" className="events_check" disabled={this.state.events_sum.length !== 0 ? false : true} id={"inlineCheckbox" + index} key={event.id} onClick={(e) => this.onClickCheckBox(e, index)} />
                                                                {this.state.isChecked[index] &&
                                                                    <label className="checked" htmlFor={"inlineCheckbox" + index}></label>
                                                                }
                                                                {!this.state.isChecked[index] &&
                                                                    <label htmlFor={"inlineCheckbox" + index}></label>
                                                                }
                                                                <div className="clear"></div>
                                                            </div>
                                                            <span className="post_head" key={event.id}>{event.name}</span>
                                                            <div className="location">
                                                                <img src="images/socket.png" alt="socket-img" />
                                                                <span className="location_info" key={event.id}><strong>Halte:</strong> {event.stop_name} · {event.timing} min vanaf {this.props.townpos.des} </span>
                                                            </div>
                                                            <p className="culture">{event.description}</p>
                                                            <div className="social_media" >
                                                                <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><img src="images/facebook.png" alt="facebook-icon" /><span>Facebook</span></a>
                                                                <a href={`${event.url}`} ><img src="images/web.png" alt="web-icon" /><span>website</span></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                        <div className="post_image">
                                                            <img src={`${event.image_url}`} alt="post-img" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="more_about">
                                        <button onClick={this.showMore} >MEER EVENTS</button>
                                        {
                                            (this.props.townpos.index !== undefined && (this.state.isChecked.filter(checkItem => checkItem === true).length !== 0)) &&
                                            <Link to="/result-page">
                                                <button className="btnClass">Plan je route</button>
                                            </Link>
                                        }
                                        {
                                            ((this.props.townpos.index === undefined) || (this.state.isChecked.filter(checkItem => checkItem === true).length === 0)) &&
                                            <button className="btnClass" style={{ background: '#9b9696' }} onClick={(e) => alert("Gelieve minstens 1 event te selecteren")}>Plan je route</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        coordinates: state.coordinates,
        townpos: state.townpos,
        events: state.events,
        stops: state.stops
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectEventsSuccess: (coordinates) => dispatch(eventsActions.selectEventsSuccess(coordinates)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Firstcontent);