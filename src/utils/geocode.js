const request = require('request')

const geocode = (location, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location +".json?limit=1&access_token=pk.eyJ1IjoiYWJoaXNoZWszMCIsImEiOiJja3Z6aXN3b3Y1MHZuMm90azU2djZvcWM1In0.DXXvD5MnhW2xlTWggT_GZw"
    request({url, json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(response.body.message  || response.body.features.length===0){
            callback('Please enter a valid location', undefined)
        } else{
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}



module.exports = geocode