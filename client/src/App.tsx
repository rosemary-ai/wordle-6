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

const Square = ({ letter, entered, index }: SquareProps) => {
  return (
    // styling depending on entered and index
    <div className="square">
      {letter}
    </div>
  )
}

const Grid = ({ words, input }: GridProps) => {
  const numRows = words.length;
  // array of 36 letters, entered words -> input -> empty squares
  const letters = (words.join("") + input).padEnd(36, " ").split("");

  const grid = letters.map((letter, i) => {
    const entered = (i / 6) < numRows;
    return <Square key={i} letter={letter} entered={entered} index={i % 6} />
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
  const [input, setInput] = useState<string>("TESTTT");
  const [words, setWords] = useState<string[]>(["WORDLE", "LETTER"]);
  // can do setInput(word => word + letter)
  return (
    <Fragment>
      <Grid words={words} input={input}/>
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
