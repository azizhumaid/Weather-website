const chalk = require('chalk');
const request = require('postman-request')
const err = chalk.bgRed.bold

forcast=(long, lat , callback)=>{
    const weatherStack_url = 'http://api.weatherstack.com/current?access_key=c14cc299793dcd78329a2695639a5df4&query='+lat+','+long+'&units=m'
    request({ url: weatherStack_url, json : true},(error,response)=> {

        if(error){
            callback(err("Couldn't connect to Server"))
        }else if (!response.body.current){
            callback(err("Logged data are wrong"))
        }else{
            const data = response.body.current
            const {temperature, feelslike, weather_descriptions} = data
            {temperature,
                feelslike,
                weather_descriptions
            }
            callback({temperature,
                feelslike,
                weather_descriptions
            })

        }
})
}

module.exports = forcast