import { readFileSync, writeFileSync } from 'fs'

try {
    const fileBuffer = readFileSync('./data.json')
    const fileText = fileBuffer.toString()
    const fileData = JSON.parse(fileText)

    const userAction = process.argv[2]
    const key = process.argv[3]
    const value = process.argv[4]

    if (userAction === "get") {
        console.log(fileData[key])
    } else if (userAction === "set") {
        fileData[key] = value
        writeFileSync("./data.json", JSON.stringify(fileData))
        console.log("Ok")
    } else {
        console.log("Comando inválido")
    }

} catch (error) {
    console.log("Algo inesperado ocorreu =/")
}