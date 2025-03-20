import React, { Fragment, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import AuthModal from 'components/AuthModal'
import Header from 'components/Header'
import { GridProps, SquareProps } from '@types'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Game />
      <LoggedInStatus />
      <AuthModal />
    </div>
  )
}

const Square = ({ letter, colour }: SquareProps) => {
  return (
    // styling depending on colour
    <div className={`square square_${colour}`}>
      {letter}
    </div>
  )
}

const Grid = ({ words, input, correctWord }: GridProps) => {
  const numRows = words.length;
  // array of 36 letters, entered words -> input -> empty squares
  const letters = (words.join("") + input).padEnd(36, " ").split("");

  const grid = letters.map((letter, i) => {
    if ((i / 6) < numRows) {
      // TODO: function to calculate colours
      // accounting for duplicate letters being entered / in correct answer
      let colour = "grey";
      if (letter === correctWord[i % 6]) {
        colour = "green";
      } else if (correctWord.includes(letter)) {
        colour = "yellow";
      }
      return <Square key={i} letter={letter} colour={colour}/>
    }
    return <Square key={i} letter={letter} colour={"blank"}/>
  });

  return (
    <Fragment>
      <div className="grid">
        {grid}
      </div>
    </Fragment>
  )
}

const Game = () => {
  const correctWord = "WORDLE";
  const [input, setInput] = useState<string>("TESTTT");
  const [words, setWords] = useState<string[]>(["LETTER", "WEEDLE", "WORDLE"]);
  // can do setInput(word => word + letter)
  return (
    <Fragment>
      <Grid words={words} input={input} correctWord={correctWord}/>
      {/* display possibly more game info */}
    </Fragment>
  )
}

const LoggedInStatus = () => {
  const { isLoggedIn, account } = useAuth()

  if (isLoggedIn && !!account) {
    return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated!</p>
  }

  return <p>NOT AUTHENTICATED / start your backend lmao</p>
}

export default App
