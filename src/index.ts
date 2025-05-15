import express, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import { Receipt } from './types'

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors()) // Enable CORS for all routes
app.use(express.json())

// create an in-memory map to store receipts
const receipts = new Map() 

app.post('/receipts/process', (req: Request, res: Response) => {
    console.log("Processing receipt", req.body)
    const id = uuidv4()
    const receipt = new Receipt(id, req.body)
    if(receipt.isReceiptValid) {
        const points = receipt.points
        receipts.set(id, points)
        res.status(200).send({"id" : id})
    } else {
        res.status(400).send("Invalid receipt")
    }
})

app.get('/receipts/:id/points', (req: Request, res: Response) => {
    const id = req.params.id
    
    if(!receipts.has(id)) {
        res.status(404).send('Receipt not found')
    } else {
        const points = receipts.get(id);
        
        res.status(200).send({
            "points": points
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})