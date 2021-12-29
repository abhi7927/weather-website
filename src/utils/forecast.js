const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2c6727ef01e1912aaea14c076bfb404f&query=' + latitude + ',' + longitude +'&units=m'           
    request({url, json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to forecast services', undefined)
        } else if(response.body.success===false) {
            callback('Please provide valid address', undefined)
        } else{
            const data = response.body.current.weather_descriptions +
             '. It is currently '+ response.body.current.temperature+
              ' degrees out. There is '+ response.body.current.precip*100 +
               '% chances of rain.' + 
               ' It feels like ' + response.body.current.feelslike + ' degrees.' + 
               ' The humidity is ' + response.body.current.humidity + '.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast