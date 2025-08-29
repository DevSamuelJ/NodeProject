import express from 'express'
import { readFileSync, writeFileSync } from 'fs'


const app = express()
app.use(express.json())
const port = 3333

app.get('/', (req, res) => {
    try {
        const fileBuffer = readFileSync('./data.json')
        const fileText = fileBuffer.toString()
        const fileData = JSON.parse(fileText)

        res.send(fileData)
    } catch (error) {
        console.log("Algo inesperado ocorreu =/")
        res.status(500).send('Internal server error')
    }
})

app.post('/', (request, response) => {
    try {
        const fileBuffer = readFileSync('./data.json')
        const fileText = fileBuffer.toString()
        const highScores = JSON.parse(fileText)

        // console.log(request.body)
        const playerIndex = highScores.findIndex(element => element.player === request.body.player)

        if (playerIndex === -1) {
            highScores.push({
                player: request.body.player,
                score: request.body.score
            })
        } else if (request.body.score < highScores[playerIndex].score) {
            highScores[playerIndex].score = request.body.score
        }

        writeFileSync("./data.json", JSON.stringify(highScores))

        response.send({message:'OK'})
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:'Internal server error'})
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
