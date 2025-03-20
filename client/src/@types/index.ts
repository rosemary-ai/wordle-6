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
  entered: boolean,
  index: number,
}

export interface GridProps {
  words: string[]
  input: string,
}
