import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => 
new Promise((resolve, reject) => {
    
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log(videoId)

    ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        
        if (seconds > 60) {
            throw new error("A duração desse video é maior que 60 segundos.")
        }
    }
    ).on("end", () => {
        console.log("download finalizado com sucesso!")
        resolve()
    })
    .on("error", (error) => {
        console.log("não foi possível fazer o download:", error)
        reject(error)

    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})

