import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div id="App" className="App">
        {this.props.children}    
      </div>
    );
  }
}

export default App;
