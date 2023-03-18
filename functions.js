import dotenv from 'dotenv'
dotenv.config()

import util from 'util'
import childProcess from 'child_process'
const exec = util.promisify(childProcess.exec)

const pr = {
    info: (str,ex) => {
        console.log(`\x1b[32mINFO\x1b[0m: ${new Date() .toLocaleString()}\t${ ex ? `${ex} ` : `` }- "\x1b[1m${str}\x1b[0m"`)
        /*pr.webhook( new EmbedBuilder()
            .setTitle('INFO')
            .setColor(Colors.Green)
            .addFields(
                {name:str, value:ex}
            )
            .setAuthor({ name: user.username, iconURL: user.avatarURL() })
            .setTimestamp()
        )*/
    },
    err: (str,ex) => {
        console.log(`\x1b[31mERROR\x1b[0m: ${new Date() .toLocaleString()}\t${ ex ? `${ex} ` : `` }- "\x1b[1m${str}\x1b[0m"`)
        /*pr.webhook( new EmbedBuilder()
            .setTitle('ERROR')
            .setColor(Colors.Red)
            .addFields(
                {name:str, value:ex}
            )
            .setAuthor({ name: user.username, iconURL: user.avatarURL() })
            .setTimestamp()
        )*/
    },
    webhook: (embed) => {
        webhookClient.send({
            // content: '',
            username: process.env.APP_NAME,
            // avatarURL: '',
            embeds: [embed],
        })
    }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

import crypto from 'crypto'
const getRandom = (N=16) => {
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return Array.from(crypto.randomFillSync(new Uint8Array(N))).map((n)=>S[n%S.length]).join('')
}

import request from 'request'
const requestSync = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { exec, sleep, getRandom, pr, requestSync, __dirname }