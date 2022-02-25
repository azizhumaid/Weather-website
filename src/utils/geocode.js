const chalk = require('chalk');
const request = require('postman-request')
const err = chalk.bgRed.bold

geocode = (address, callback) => {
    const mapBox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXppemh1bWFpZCIsImEiOiJja3pwZGl5bTQzZnZ5Mm9vMDhybDE2ZHBiIn0.Us1NRt73A1-C8uTSTph5Pw'
    request({ url: mapBox_url, json : true},(error,response)=> {
        if(error){
           console.log(err("Couldn't connect to Server"))
           callback(error,"Couldn't connect to Server")
        }else if (response.body.features.length===0){
            console.log(err("Logged data are wrong"))
            callback(error)
        }else{
            const data = response.body.features[0].geometry.coordinates
            callback(error, {long:data[0],
                      lat: data[1],
                      loc: response.body.features[0].place_name})

        }
    
    
    })

}

module.exports = geocode
