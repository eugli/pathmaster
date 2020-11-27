import React, { Component } from "react";

import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div onMouseUp={() => this.props.handleMouseUp()}>
        <div className="footer">
          Made with <span className="heart">❤</span> for COP3530
        </div>
      </div>
    );
  }
}
