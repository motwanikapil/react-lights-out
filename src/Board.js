import React, { Component } from 'react'
import Cell from './Cell'
import './Board.css'

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  }
  constructor(props) {
    super(props)

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  randomValue = () => {
    let value = Math.floor(Math.random() * 2)
    return value === 0 ? false : true
  }
  createBoard = () => {
    let initialBoard = []
    // TODO: create array-of-arrays of true/false values -- DONE

    for (let j = 0; j < this.props.ncols; j++) {
      let temp = []
      for (let i = 0; i < this.props.nrows; i++) {
        temp.push(Math.random() < this.props.chanceLightStartsOn)
      }
      initialBoard.push(temp)
    }

    return initialBoard
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    const { nrows, ncols } = this.props
    let board = this.state.board
    let [y, x] = coord.split('-').map(Number)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (y >= 0 && y < nrows && x >= 0 && x < ncols) {
        board[y][x] = !board[y][x]
      }
    }

    // TODO: flip this cell and the cells around it

    flipCell(y, x)
    flipCell(y - 1, x)
    flipCell(y + 1, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)

    let hasWon = board.every((row) => row.every((cell) => !cell))
    // // win when every cell is turned off
    // // TODO: determine is the game has been won

    this.setState({ board: board, hasWon: hasWon })
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else

    // TODO
    let tblBoard = []

    for (let x = 0; x < this.props.nrows; x++) {
      let row = []
      for (let y = 0; y < this.props.ncols; y++) {
        let coord = `${x}-${y}`
        row.push(
          <Cell
            isLit={this.state.board[x][y]}
            key={coord}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        )
      }

      tblBoard.push(<tr key={x}>{row}</tr>)
    }
    return (
      <div
        style={{
          height: '100%',
          paddingTop: '2vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        {this.state.hasWon ? <div></div> : <span className='neon'>Lights</span>}
        <table className='Board'>
          {this.state.hasWon ? (
            <tbody>
              <tr>
                <td>
                  <h1 style={{ fontSize: '11vw' }}>
                    <span className='neon'>You</span>
                    <span className='flux'> Win!</span>{' '}
                  </h1>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{tblBoard}</tbody>
          )}
        </table>
        {this.state.hasWon ? <div></div> : <span className='flux'> Out!</span>}
      </div>
    )
    // make table board

    // TODO
  }
}

export default Board
