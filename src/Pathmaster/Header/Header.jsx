import React, { Component } from "react";
import PieceIcon from "./PieceIcon";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: ["King", "Queen", "Bishop", "Rook", "Knight", "Pawn"],
      currentPiece: this.props.currentPiece,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPiece: nextProps.currentPiece });
  }

  render() {
    var { icons, currentPiece } = this.state;

    return (
      <div className="header_container">
        <div className="header" onClick={() => this.props.handleMouseUp()}>
          <div className="top_header">
            <div className="logo_holder">
              <div>
                <li onClick={() => this.props.setPieceType("Pawn")}>
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/107/107613.svg"
                    width="35"
                    alt="🥚"
                  ></img>
                </li>
              </div>
              <h1>
                PATH<span>MASTER</span>
              </h1>
            </div>
            <div className="top_button">
              <Button onClick={() => this.props.visualize()}>Run</Button>
            </div>
            <div className="top_button">
              <Button onClick={() => this.props.resetBoard()}>Reset</Button>
            </div>
            <ul className="navigation">
              <a
                href="https://github.com/eugli/Pathmaster"
                target="_blank"
                rel="noreferrer"
              >
                <li>
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/25/25231.svg"
                    width="40"
                    height="40"
                    alt="GitHub"
                  ></img>
                </li>
              </a>
            </ul>
          </div>
          <div className="bottom_header">
            <ul className="piece_select">
              <h1>Select a Piece:</h1>
              <span>
                {icons.map((piece) => {
                  return (
                    <PieceIcon
                      currentPiece={currentPiece}
                      key={piece}
                      piece={piece}
                      setPieceType={this.props.setPieceType}
                    />
                  );
                })}
              </span>
            </ul>
            <div className="algo_select">
              <h1>Select Algorithm:</h1>
              <div className="selectdiv">
                <label>
                  <Select
                    defaultValue={this.props.algorithm}
                    onChange={(e) => this.props.setAlgorithm(e.target.value)}
                  >
                    <MenuItem value="Dijkstra">Dijkstra's Algorithm</MenuItem>
                    <MenuItem value="BFS">Breadth-First Search</MenuItem>
                    <MenuItem value="A* (Weighted)">
                      A* Search (Weighted)
                    </MenuItem>
                    <MenuItem value="A* (Unweighted)">
                      A* Search (Unweighted)
                    </MenuItem>
                  </Select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
