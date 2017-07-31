import React from 'react';

export default class Depanne extends React.Component {
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
                                        <h2>Je attractie op de lijn <br /> <b>richting De Panne</b></h2>
                                        <div className="attraction_border">&nbsp;</div>
                                        {
                                            this.props.depannes.map((depanne, index) => {
                                                if (depanne.itemPosition.point_type === 1) {

                                                    return (
                                                        <div className="attraction_post" style={{ background: '#ffd800' }} key={depanne.id}>

                                                            <div className="attraction_post_left col-md-8 col-sm-8  col-xs-12" >
                                                                <div className="post_content">
                                                                    <h6>EVENT <strong>· Kusttram+ partner</strong></h6>

                                                                    <span className="post_head" key={depanne.id}>{depanne.itemPosition.event_name}</span>
                                                                    <div className="location">
                                                                        <img src="images/socket.png" alt="socket-img" />
                                                                        <span className="location_info" key={depanne.id}><strong>Halte:</strong> {depanne.itemPosition.stop_name} · {depanne.itemPosition.timing} min vanaf {this.props.townpos.des} </span>
                                                                    </div>
                                                                    <p className="culture">CultuurCafé gebruikt zo veel mogelijk biologische en lokale producten. </p>



                                                                    <div className="social_media" >
                                                                        <a href="http://facebook.com"><img src="images/facebook.png" alt="facebook-icon" /><span>Facebook</span></a>
                                                                        <a href={`${depanne.itemPosition.url}`} ><img src="images/web.png" alt="web-icon" /><span>website</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                                <div className="post_image">
                                                                    <img src={`${depanne.itemPosition.image_url}`} alt="post-img" />
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
                                                } else {
                                                    return (
                                                        <div className="attraction_post" style={{ background: 'transparent' }} key={depanne.id}>

                                                            <div className="attraction_post_left col-md-8 col-sm-8  col-xs-12" >
                                                                <div className="post_content">
                                                                    <h6>EVENT <strong>· Kusttram+ partner</strong></h6>

                                                                    <span className="post_head" key={depanne.id}>{depanne.itemPosition.event_name}</span>
                                                                    <div className="location">
                                                                        <img src="images/socket.png" alt="socket-img" />
                                                                        <span className="location_info" key={depanne.id}><strong>Halte:</strong> {depanne.itemPosition.stop_name} · {depanne.itemPosition.timing} min vanaf {this.props.townpos.des} </span>
                                                                    </div>
                                                                    <p className="culture">CultuurCafé gebruikt zo veel mogelijk biologische en lokale producten. </p>



                                                                    <div className="social_media" >
                                                                        <a href="http://facebook.com"><img src="images/facebook.png" alt="facebook-icon" /><span>Facebook</span></a>
                                                                        <a href={`${depanne.itemPosition.url}`} ><img src="images/web.png" alt="web-icon" /><span>website</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                                <div className="post_image">
                                                                    <img src={`${depanne.itemPosition.image_url}`} alt="post-img" />
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