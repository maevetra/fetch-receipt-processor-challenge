import express, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// create an in-memory map to store receipts
const receipts = new Map() 

app.post('/receipts/process', (req: Request, res: Response) => {
    // TODO: implement processing receipts
})

app.get('/receipts/:id/points', (req: Request, res: Response) => {
    // TODO: implement get receipts
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})