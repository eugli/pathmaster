import React, { Component } from "react";
import Logo from "../../Assets/pathmaster.png"
import GitHub from "../../Assets/github.png"
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
            <div className="logo_holder header_item">
              <div>
                <li onClick={() => this.props.setPieceType("Pawn")}>
                  <img
                    src={Logo}
                    width="35"
                    alt="🥚"
                  ></img>
                </li>
              </div>
              <h1>
                PATH<span>MASTER</span>
              </h1>
            </div>
            <div className="top_button header_item">
              <Button
                style={{
                  backgroundColor: '#f9d67766',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 3px 5px 2px #0000001a'
                }}
                onClick={() => this.props.visualize()}>Run</Button>
            </div>
            <div className="top_button header_item">
              <Button
                style={{
                  backgroundColor: '#f9d67766',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 3px 5px 2px #0000001a'
                }}
                onClick={() => this.props.resetBoard()}>Reset</Button>
            </div>
            <ul className="navigation header_item">
              <a
                href="https://github.com/eugli/Pathmaster"
                target="_blank"
                rel="noreferrer"
              >
                <li>
                  <img
                    src={GitHub}
                    width="40"
                    height="40"
                    alt="GitHub"
                  ></img>
                </li>
              </a>
            </ul>
          </div>
          <div className="bottom_header">
            <div className="piece_select">
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
            </div>
            <div className="algo_select">
              <h1>Select Algorithm:</h1>
              <div className="selectdiv">
                <label>
                  <Select
                    value={this.props.algorithm ?? ""}
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
