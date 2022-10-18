if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}
const express = require("express")
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3303
const env = process.env

const data = require('./data.json')

mongoose.connect(env.URI_DB)
const db = mongoose.connection
db.on('error', err=>console.log(err))
db.on('open', () => { console.log(`connected to ${env.URI_DB}`) })


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use('/', express.static(path.join(__dirname, 'public')))


/////////////////////////////////////////////// Util functions //////////////////////////////////////////////////

const checkAuthenticated = (req, res, next)=>{
    if(isAuthenticated("s")) next()
    res.redirect('/')
}

const isAuthenticated = (user)=>{
    return true
}

const timestamp = ()=>{
    return `${new Date().toLocaleTimeString()} -- ${new Date().toJSON().slice(0,10).replace(/-/g,'/')}`
}

/////////////////////////////////////////  Request Handlers  ////////////////////////////////////////////////////

//////////////////// Get Requests  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res)=>{
    res.render('index.ejs')
})
app.get('/login', (req, res)=>{
    res.status(201).render('pages/login.ejs')
})
app.get('/register', (req, res)=>{
    res.status(201).render('pages/register.ejs')
})
app.get('/forgot-password', (req, res)=>{
    res.status(201).render('pages/forgot.ejs')
})
app.get('/dashboard', (req, res)=>{
    res.status(200).render('pages/dashboard.ejs', {name: "user name", last_visited: timestamp(), username:"username", email:"example@email.com", phone_number:"9310365483", data: data})
})

app.get('/:username', (req, res)=>{
    res.status(200).render('pages/dashboard.ejs',{name: "full name", last_visited: timestamp(),username:req.params.username, email: `${req.params.username}@email.com`, phone_number:"9411908045", data:data})
})

/////////////////// Post Requests \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.post('/auth/register', (req, res)=>{
    console.log(req.body)
    res.status(201).send()
})

app.post('/auth/login', (req, res)=>{

})


///////////////////////////////////////////////// Bad Requests //////////////////////////////////////////////////
app.get('*', (req, res)=>{
    res.status(404).send(`Not Found`)
})
app.post('*', (req, res)=>{
    res.status(400).send(`Bad Request`)
})
app.put('*', (req, res)=>{
    res.status(400).send(`Bad Request`)
})
app.delete('*', (req, res)=>{
    res.status(400).send(`Bad Request`)
})
app.patch('*', (req, res)=>{
    res.status(400).send(`Bad Request`)
})

////////////////////////////////////////////// Start Listening //////////////////////////////////////////////////

app.listen(port, ()=>console.log(`server running at localhost:${port}`))