//required lib
const path = require('path')
const express = require('express')

const chalk = require('chalk')
const hbs =require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const Orange = chalk.hex('#FFA500').inverse.bold
console.log(Orange('New Run!!!'))

const app = express()

//Define Paths for express config
const publicDireectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup Static directory for handelebar
app.use(express.static(publicDireectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Aziz'
    })
})


app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About',
        name:'Aziz'
    })
})


app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        name:'Aziz'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide a search term'
        })
    }else{
        geocode(req.query.address,(error,callB)=>{
            
            if(!callB){
                console.log(error)
                res.send({
                    error: 'You must provide a proper search term'
                })
            }else{
                const location = callB.loc
                forecast(callB.long, callB.lat, (callB) => {
                res.send({
                    forecast: callB.weather_descriptions[0],
                    location: location,
                    address: req.query.address
                    })
                })
            }
            
        
        })

    }


})

app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000')
})