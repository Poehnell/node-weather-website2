const request = require('postman-request')


const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5c674efc48904b6b51e7715e14dab460&query=' + lat + ',' + long
        request({url: url, json:true},(error, {body})=>{
            if (error){
                callback('Unable to connect to forecast services', undefined)
            }else if (body.error){
                callback('Unable to find location. Try another', undefined)
            }else {
                callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            }
        })
}

module.exports = forecast