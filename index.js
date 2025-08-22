import express from "express"

// const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/teste", function(request, response){
    response.send("mensagem de teste")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
