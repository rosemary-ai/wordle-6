import React, { Fragment } from 'react'
import { useAuth } from 'contexts/AuthContext'
import AuthModal from 'components/AuthModal'
import Header from 'components/Header'
import { SquareProps } from '@types'

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

const Square = ({ letter }: SquareProps) => {
  return (
    <div className="square">
      {letter}
    </div>
  )
}

const Game = () => {
  // game state handling
  return (
    <Fragment>
      <Grid />
      {/* possibly more game info */}
    </Fragment>
  )
}

const Grid = () => {
  return (
    <div className="grid">
      {/* TODO: make this a loop like tic tac toe */}
      <Square letter='a' />
    </div>
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
