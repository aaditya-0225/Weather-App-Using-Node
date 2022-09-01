const express = require('express')
const app = express()
const axios = require('axios').default;
var bodyParser = require('body-parser');
var temp_value;
var Icon_code;
var humidity_value;
var desc;
const { response, request } = require('express');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname+'/public'));
app.set("view engine","ejs")


app.get('/', function (req, res) {
 
  res.render("index",{
    temp:'' , 
    icon:'' , 
    humidity:'',
    description:'',
    })
})

app.post('/fetch_data', function (req,res){
var cityName = req.body.city;

var url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=e9927693fe31571163aef44044ae8448&units=metric'; 


axios.get(url)
  .then(function (response) {
    // handle success
    Icon_code = response.data.weather[0].icon;
    desc=response.data.weather[0].description;
    temp_value = response.data.main.temp;
    humidity_value= response.data.main.humidity;
    var iconurl= "http://openweathermap.org/img/w/" + Icon_code + ".png";

    console.log(temp_value)
    console.log(humidity_value)
    res.render("index",{
      temp:temp_value , 
      icon:iconurl ,
      humidity:humidity_value ,
      description:desc,
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.render("index",{temp:'please enter a valid city name'})
  })
  .then(function () {
    // always executed
    console.log('Data Fetched Successfully...')
    
  });

 
});

app.listen(4000);