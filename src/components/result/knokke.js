import React from 'react';

export default class Knokke extends React.Component {

    componentWillReceiveProps(nextProps) {

    }
    render() {

        return (

            <div className="result_main_left pull-left col-lg-6 col-md-6 col-sm-12 col-xs-12">

                <div className="mian_content">
                    <div className="container">
                        <div className="attraction_width_left">
                            <div className="attraction clearfix">

                                <div className="attraction-left  col-sm-6 col-md-6 col-xs-12">
                                    <div className="result_left_attraction clearfix">
                                        <h2>Je attractie op de lijn <br /> <b>richting Knokke</b></h2>
                                        <div className="attraction_border">&nbsp;</div>

                                        {
                                            this.props.knokkes.map((knokke, index) => {
                                                if (knokke.itemPosition.point_type === 1) {

                                                    return (
                                                        <div className="attraction_post" style={{ background: '#ffd800' }} key={knokke.id}>

                                                            <div className="attraction_post_left col-md-8 col-sm-8  col-xs-12" >
                                                                <div className="post_content">
                                                                    <h6>EVENT <strong>· Kusttram+ partner</strong></h6>

                                                                    <span className="post_head" key={knokke.id}>{knokke.itemPosition.event_name}</span>
                                                                    <div className="location">
                                                                        <img src="images/socket.png" alt="socket-img" />
                                                                        <span className="location_info" key={knokke.id}><strong>Halte:</strong> {knokke.itemPosition.stop_name} · {knokke.itemPosition.timing} min vanaf {this.props.townpos.des} </span>
                                                                    </div>
                                                                    <p className="culture">CultuurCafé gebruikt zo veel mogelijk biologische en lokale producten. </p>



                                                                    <div className="social_media" >
                                                                        <a href="http://facebook.com"><img src="images/facebook.png" alt="facebook-icon" /><span>Facebook</span></a>
                                                                        <a href={`${knokke.itemPosition.url}`} ><img src="images/web.png" alt="web-icon" /><span>website</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                                <div className="post_image">
                                                                    <img src={`${knokke.itemPosition.image_url}`} alt="post-img" />
                                                                </div>
                                                            </div>
                                                            <div className="adviseerds_block clearfix" style={{float:'left',marginTop:'30px'}}>
                                                                <h5>adviseerde ticket <span>De dagpas</span></h5>
                                                                <div className="adviseerds_block_info">
                                                                    <img src="images/attraction-img.png" width="25" height="21" alt="adviserde-img" />
                                                                    <strong>Vanaf <b>€ 6,00</b> / Persoon</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="attraction_post" style={{ background: 'transparent' }} key={knokke.id}>

                                                            <div className="attraction_post_left col-md-8 col-sm-8  col-xs-12" >
                                                                <div className="post_content">
                                                                    <h6>EVENT <strong>· Kusttram+ partner</strong></h6>

                                                                    <span className="post_head" key={knokke.id}>{knokke.itemPosition.event_name}</span>
                                                                    <div className="location">
                                                                        <img src="images/socket.png" alt="socket-img" />
                                                                        <span className="location_info" key={knokke.id}><strong>Halte:</strong> {knokke.itemPosition.stop_name} · {knokke.itemPosition.timing} min vanaf {this.props.townpos.des} </span>
                                                                    </div>
                                                                    <p className="culture">CultuurCafé gebruikt zo veel mogelijk biologische en lokale producten. </p>

                                                                    <div className="social_media" >
                                                                        <a href="http://facebook.com"><img src="images/facebook.png" alt="facebook-icon" /><span>Facebook</span></a>
                                                                        <a href={`${knokke.itemPosition.url}`} ><img src="images/web.png" alt="web-icon" /><span>website</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                                <div className="post_image">
                                                                    <img src={`${knokke.itemPosition.image_url}`} alt="post-img" />
                                                                </div>
                                                            </div>
                                                            <div className="adviseerds_block clearfix" style={{float:'left', marginTop:'30px'}}>
                                                                <h5>adviseerde ticket <span>De dagpas</span></h5>
                                                                <div className="adviseerds_block_info">
                                                                    <img src="images/attraction-img.png" width="25" height="21" alt="adviserde-img" />
                                                                    <strong>Vanaf <b>€ 6,00</b> / Persoon</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
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