let express = require('express')
let line = require('@line/bot-sdk')

let lineAccount = require("./linekey.json")
let client = new line.Client(lineAccount)

let app = express()
app.post('/webhook' , line.middleware(lineAccount), function(req,res){
    let promise = []
    for(let event in req.body.events)
    {
        promise.push(lineEvent(event))
    }
    
    Promise.all(promise).then(function (){
        res.status(200).send()
    }).catch(function(){
        res.status(400).send()
    })
})

let lineEvent = function(event){
    return new Promise(function(resolve,reject){
        if(event.type === 'message'){
            if(event.message.type === 'text')
            {
                let text =event.message.text
                if(/[Hh]i|嗨/.test(text))
                {
                    let response = 'Hi'
                    reply(event, response).then(function () {
                        resolve()
                    }).catch(function () {
                        reject()
                    })
                }
                else if((/身分證/.test(text))
                {
                    let response = 'G122315089\nG122254849\nG122320722\nG122343538\nG122369569\nG222005491\nG222150599\nG222151425'
                    reply(event, response).then(function () {
                        resolve()
                    }).catch(function () {
                        reject()
                    })
                }
                else
                {
                    let response = '若要尋求協助\n電話:0908312004\nmail:as25200200@gmail.com\n     a315119@info.ltivs.ilc.edu.tw\n     b10615018@mail.ntust.edu.tw'
                    reply(event, response).then(function () {
                        resolve()
                    }).catch(function () {
                        reject()
                    })
                }            
            }else if(event.message.type === 'image')
            {
            }        
        }else if(event.message.type === 'follow'){
            
        }
    })
}

let reply = function (event, text) {
    return new Promise(function (resolve, reject) {
        client.replyMessage(event.replyToken, {type: 'text', text: text})
            .then(function () {
                resolve()
            }).catch(function (error) {
                console.log(error)
                reject()
            })
    })
}
const port = process.env.port ||3000
app.listen(port,function(){
    console.log('listening on '+port)
})