import React, { Fragment, useEffect, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import AuthModal from 'components/AuthModal'
import Header from 'components/Header'
import { GridProps, Letters, SquareProps } from '@types'

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
      return <Square key={i} letter={letter} 
              colour={letterColour(words[Math.floor(i / 6)], i % 6, correctWord)}/>
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

// hopefully this works
const letterColour = (word: string, index: number, correctWord: string): string => {
  if (word[index] === correctWord[index]) return "green";
  const letter = word[index];
  let correctIndex = correctWord.indexOf(letter);
  let matchingIndex = word.indexOf(letter);
  while (correctIndex >= 0) {
    if (matchingIndex < index) {
      if (!(correctWord[matchingIndex] === letter)) correctIndex = correctWord.indexOf(letter, correctIndex + 1);
      matchingIndex = word.indexOf(letter, matchingIndex + 1);
    } else if (word[correctIndex] === letter) {
      correctIndex = correctWord.indexOf(letter, correctIndex + 1);
    } else {
      return "yellow";
    }
  }
  return "grey";
}

const Game = () => {
  const correctWord = "WORDLE";
  const [letters, setLetters] = useState<Letters>({ 
    words: [],
    input: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setLetters((prevLetters) => {
        if (prevLetters.words.length >= 6 || gameWon(prevLetters.words, correctWord)) {
          return prevLetters;
        }

        // TOOD: add check for real word being entered
        if (/^[a-zA-Z]$/.test(e.key) && prevLetters.input.length < 6) {
          return {
            words: prevLetters.words, 
            input: prevLetters.input + e.key.toUpperCase()
          };
        } else if (e.key === "Backspace" || e.key === "Delete") {
          return {
            words: prevLetters.words,
            input: prevLetters.input.slice(0, -1)
          };
        } else if (e.key === "Enter" && prevLetters.input.length === 6) {
          return {
            words: [...prevLetters.words, prevLetters.input],
            input: ""
          };
        }
        return prevLetters;
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <Fragment>
      <Grid words={letters.words} input={letters.input} correctWord={correctWord}/>
      <p>{gameWon(letters.words, correctWord) && "yay you won"}</p>
      <p>{!gameWon(letters.words, correctWord) && letters.words.length >= 6 && `you lost lol the word was ${correctWord}`}</p>
    </Fragment>
  )
}

const gameWon = (words: string[], correctWord: string) => {
  return (words[words.length - 1] === correctWord);
}

const LoggedInStatus = () => {
  const { isLoggedIn, account } = useAuth()

  if (isLoggedIn && !!account) {
    return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated!</p>
  }

  return <p>NOT AUTHENTICATED / start your backend lmao</p>
}

export default App
