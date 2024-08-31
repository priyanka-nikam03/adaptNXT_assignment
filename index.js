const express = require("express")
const path = require ("path")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(cors())
app.use(express.json())

const initializeServer = async ()=> {
    try {
        const port = 7080
        app.listen(port, ()=>{
            console.log("Server is running on http://localhost:"+port)
        })
        
    } catch (error) {
        console.log("Error:Internal server error.")
        process.exit(1)
    }
};

initializeServer()



// apis 

// URL : http://localhost:<port>/
// Method: GET
// Displays a default message

app.get('/', async(request, response) => {
    try {
        response.send("Welcome to AdaptNXT weather service!!")
        
    } catch (error) {
        console.log("Error:",e.message)
        response.status(500).json({error: 'Internal Server Error'})
    }
})

// URL : http://localhost:<port>/weather/location
// Method: GET
// Query argument = city
// Displays a default message

app.get('/weather/location', async(request, response) => {
    const API_ACCESS_KEY = "8016bddf38ab44e6f29889e471f15d51"
    const location = request.query.location
    console.log("location::",location)

    if(!location){
        response.status(400).json({"error": "location  is required"})
    }

    try {

        const weatherstack_url =  "http://api.weatherstack.com/current?" + "access_key=" + API_ACCESS_KEY +"&query=" + location
        console.log(weatherstack_url)
        const response_data = await axios.get(weatherstack_url)

        const wData = response_data.data;
        console.log(wData)
        response.json(wData)
        
    }  catch(error) {
       
            response.status(500).json({"error": "Failed to fetch response from weatherstacks api"})
        


    }
    

});


module.exports = app;
