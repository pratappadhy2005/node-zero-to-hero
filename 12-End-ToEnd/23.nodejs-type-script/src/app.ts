console.log('Hello NodeJS from Type Script!')

//basic types
let isDone: boolean = true

let count: number = 10

let list: number[] = [1, 2, 3]

let products: string[] = ['Apple', 'Orange', 'Banana']

let random: any = 'Hello World'

let xyz: undefined = undefined

let yz: null = null

enum Color {
  Red,
  Green,
  Blue,
}

let d: Color = Color.Green

//tuple
let abc: [string, number] = ['Pratap', 100]

// interfaces , types
interface User {
  name: string
  age: number
  email?: string
  id: number
}

const user: User = {
  name: 'Pratap',
  age: 30,
  id: 100,
}

//type
type UserType = {
  name: string
  age: number
  email?: string
  id: number
}

const userType: UserType = {
  name: 'Pratap',
  age: 30,
  id: 100,
}

//Functions with type annotation
function add(a: number, b: number): number {
  return a + b
}

//Arrow functions
const multiple = (a: number, b: number): number => {
  return a * b
}

const greet = (name: string, greet?: string): string => {
  return `Hello ${name}, ${greet || 'Welcome'}`
} 

console.log(greet('Pratap', 'Good morning'))
