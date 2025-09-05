import { WebSocketServer } from 'ws';
import { readFileSync, writeFileSync} from "fs";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("Conexão efetuada com sucesso!")

    let randomNumber = Math.floor(101*Math.random())

    let playerName;

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        // console.log('received: %s', data);

        if(data.toString() === "Buscar jogadores"){
                try {
                    const fileBuffer = readFileSync('./data.json')
                    const fileText = fileBuffer.toString()
                    const fileData = JSON.parse(fileText)
                    const players ={
                        jogadores: fileData
                    }
            
                    ws.send(JSON.stringify(players))
                } catch (error) {
                    console.log("Algo inesperado ocorreu =/")
                    res.status(500).send('Internal server error')
                    ws.send(error.message)
            }
        }
    });

    ws.on('close', ()=>{
        console.log("Conexão encerrada!")
    })

    ws.send('something');
});