const express = require("express")
const server = express()
const routes = require('./routes')
const path = require("path")

//this is how we use template engine (ejs)
server.set('view engine', 'ejs')

//this was in route.js - const basePath = __dirname + "/views/"; 
server.set('views', path.join(__dirname, 'views'))

//enable static files - public folder
server.use(express.static("public"))

//set for using req.body
server.use(express.urlencoded({ extended: true }))

server.use(routes)

server.listen(3000, () => console.log('rodando...'))

