import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const initialPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [positions, setPositions] = useState(initialPositions)
  const [player, setPlayer] = useState(-1)
  const [winningIndexes, setWinningWindexes] = useState(null)
  const [hasNoWinner, setHasNoWinner] = useState(false)
  const [winnerPlayer, setWinnerPlayser] = useState(null)

  const winnningPositions = [
    // horizontal
    { indexes: [0, 1, 2], orientation: 'horizontal' },
    { indexes: [3, 4, 5], orientation: 'horizontal' },
    { indexes: [6, 7, 8], orientation: 'horizontal' },

    // vertical
    { indexes: [0, 3, 6], orientation: 'vertical' },
    { indexes: [1, 4, 7], orientation: 'vertical' },
    { indexes: [2, 5, 8], orientation: 'vertical' },

    // diagonal
    { indexes: [0, 4, 8], orientation: 'diagonal1' },
    { indexes: [2, 4, 6], orientation: 'diagonal2' },
  ]

  const handleClicked = (clickedIndex) => {
    if (positions[clickedIndex] != 0 || winnerPlayer != null) {
      return
    }
    setPositions(positions.map((position, index) => {
      if (index == clickedIndex) {
        return player
      }
      return position
    }))
  }

  const resetGame = () => {
    setPositions(initialPositions)
    setWinningWindexes(null)
    setPlayer(-1)
    setWinnerPlayser(null)
    setHasNoWinner(false)
  }

  const sumArray = (array) => {
    return array.reduce((accummulator, value) => accummulator + value, 0)
  }

  const checkWinner = () => {
    winnningPositions.forEach(position => {
      const currentCheckinPositions = positions.filter(
        (p, index) => position.indexes.includes(index)
      )
      if ([-3, 3].includes(sumArray(currentCheckinPositions))) {
        setWinningWindexes(position)
        setWinnerPlayser(player)
      }
    })
    setPlayer(player == 1 ? -1 : 1)
  }

  const checkBrokenGame = () => {
    if (winnerPlayer == null && positions.every(value => value != 0)) {
      setHasNoWinner(true)
    }
  }

  useEffect(() => {
    checkWinner()
  }, [positions])

  useEffect(() => {
    checkBrokenGame()
  }, [player])

  return (
    <div className="App">
      {winnerPlayer != null &&
        <div className='winner-div'>
          <span className='winner'>Parabéns ao Jogador </span>
          <span className='winner-icon'>{winnerPlayer == 1 ? '❌' : '⭕️'}</span>
        </div>
      }
      {hasNoWinner &&
        <div className="broken-game">
          <span>Deu Velha</span>
        </div>
      }
      <div className='blocks'>
        {positions.map((position, index) =>
          <div
            className={
              `block ${winningIndexes?.indexes.includes(index) ?
                `animated-winner ${winningIndexes.orientation}` :
                ''
              }`
            }
            key={index}
            onClick={() => handleClicked(index)}
          >
            <span>
              {position == 1 && 'X'}
              {position == -1 && 'O'}
            </span>
          </div>
        )}

      </div>
      <div>
        {(winnerPlayer != null || hasNoWinner == true) &&
          <button onClick={resetGame} className='restart-button'>Reiniciar</button>
        }
      </div>
    </div>
  );
}

export default App;
