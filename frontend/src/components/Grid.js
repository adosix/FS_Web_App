// grid.js
import React from 'react';
import Square from './Tile';
import '../style/Grid.css';

class Grid extends React.Component {
  state = {
    selectedSquare: [0, 0],
  };

  makeSquares = () => {
    const tiles = ["red", "blue", "yellow", "purple", "green"];
    let arr = [];
    let key = 0;
    for (let i = 0; i < this.props.gridWidth; i++) {
      for (let j = 0; j < this.props.gridWidth; j++) {
        arr.push(
          <Square
            x={j}
            y={i}
            key={key++}
            tile={tiles[Math.floor(Math.random() * tiles.length)]}
            selectedSquare={this.state.selectedSquare}
          />
        );
      }
    }
    return arr;
  };

  componentDidMount = () => {
    this.update();
    window.addEventListener('keydown', this.handleKeyPress);
  };

  update = () => {
    this.setState({
      selectedSquare: this.props.updateGridState,
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

 
  componentDidUpdate() {
    if (
      (this.state.selectedSquare[0] !== this.props.updateGridState[0] ||
        this.state.selectedSquare[1] !== this.props.updateGridState[1])
    ) {
      this.update();
    }
  }
  render() {
    return (
      <div
        className="grid-box"
        style={{ width: this.props.gridWidth * 150, height: this.props.gridWidth * 150 }}
      >
        {this.makeSquares()}
      </div>
    );
  }
}

export default Grid;