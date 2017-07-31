import React from 'react';
import Navbar from '../shared/navbar';
import Firstheader from './firstheader';
import Firstcontent from './firstcontent';
import { connect } from 'react-redux';

class First extends React.Component {

    render() {
        return (
            <div id="wrapper">
                <Navbar />
                <Firstheader events={this.props.events} />
                <Firstcontent events={this.props.events} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

  return {
    events: state.events
  }
};

const mapDispatchToProps = (dispatch) => {
 return {

 }
};

export default connect(mapStateToProps, mapDispatchToProps)(First);