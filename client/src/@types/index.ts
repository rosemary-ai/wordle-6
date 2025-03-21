export interface Account {
  username: string
  password: string
  role: 'user' | 'admin'
}

export interface FormData {
  username: Account['username']
  password: Account['password']
}

export interface SquareProps {
  letter: string,
  colour: string,
}

export interface GridProps {
  words: string[]
  input: string,
  correctWord: string,
}

export interface Letters {
  words: string[],
  input: string,
}
