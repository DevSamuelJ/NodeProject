import express from "express"
import { readFileSync } from "fs"


const app = express()
app.use(express.json())
const port = 5000

app.get('/', (req, res) => {
  try{
    const fileBuffer = readFileSync('./data.json')
    const fileText = fileBuffer.toString()
    const fileData = JSON.parse(fileText)

    res.send(fileData)
  }catch(error){
    console.log("Algo de errado aconteceu...")
    res.status(500).send("Internal server error")
  }
})

app.post("/", (request, response) =>{
    try{
        console.log(request.body)

    }catch(error){
        console.log("Algo deu errado!")
    }
})

app.get("/teste", function(request, response){
    response.send("mensagem de teste")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})