import express from 'express'
const app = express()
import fs from 'fs'
import ogp from 'ogp-parser'
import dotenv from 'dotenv'
dotenv.config()

import { exec, sleep, getRandom, pr, requestSync, __dirname } from './functions.js'

app.use((req,res,next)=>{
    pr.info(req.originalUrl,`GET`)
    next()
})

app.use('/src', express.static('./src'))

app.get('/:id', async (req, res) => {
    const response = await requestSync({
        url: new URL(`/get/${req.params.id}`, process.env.API_ADDRESS),
        method: 'GET',
        json: true
    })
    console.log(response)
    let image = `https://s.topi.cf/image?url=${response.originalUrl}`
    if(response.status===200){
        const data = await ogp(response.originalUrl).catch(e=>{})
        if( data ){
            image = data.ogp['og:image'][0]
        }
    }
    const html = await fs.readFile('test.txt', 'utf8')
    res.send(
        html.replace(/{{id}}/, response.id)
            .replace(/{{image}}/, image)
            .replace(/{{originalUrl}}/, response.originalUrl)
    )
})

app.listen(process.env.PORT, async () => {
    pr.info(`Start`,`HTTP`)
})