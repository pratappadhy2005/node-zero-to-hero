import express from 'express'
import type { Express, Request, Response } from 'express'
import { User, IUser } from './models/User'

const app: Express = express()
const port: number = 3000


app.use(express.static('public'))
app.use(express.json())

// middleware  -> add start time to request
interface CustomRequest extends Request {
  startTime?: number
}

app.use((req: CustomRequest, res: Response, next: () => void) => {
  req.startTime = Date.now()
  next()
})

// post route
interface User{
  name: string,
  email: string
}

app.post('/user', (req: Request<{}, {}, IUser>, res: Response) => {
  const user: IUser = req.body
  res.send(`Hello NodeJS from Type Script! User ${user.name} with email ${user.email}`)
})

app.get('/users/:id', (req: Request<{id: string}>, res: Response) => {
  const id: string = req.params.id
  res.send(`Hello NodeJS from Type Script! User ${id}`)
})

app.get('/', (req : Request, res : Response) => {
  res.send('Hello NodeJS from Type Script!')
})


app.get('/users', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})