require('dotenv').config();
const apiKey = process.env.API_KEY;
const botKey = process.env.BOT_KEY;


const { Telegraf } = require("telegraf");
const bot = new Telegraf(botKey);
const request=require('request');

bot.hears("/start",(ctx) =>{
    ctx.reply("Please type your city name ");
})
bot.on('text',(ctx) =>{
    let userText=ctx.message.text;
    let chatId=ctx.chat.id;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${userText}&appid=${apiKey}&units=metric`;
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
        const res=JSON.parse(body);
        
        let temperature=res.main.temp;
        let skyCondition =res.weather[0].description;
        let tempFeel=res.main.feels_like;
        let humidity=res.main.humidity;
        let windSpeed=res.wind.speed;
        
        ctx.reply(`   **** ${userText} ****
        \nTemperature: ${temperature}°C
        \nWeather: ${skyCondition} 
        \nTemperature feels like: ${tempFeel}°C
        \nHumidity: ${humidity}%
        \nWind speed: ${windSpeed} km/hr`);
        }
        else{
            ctx.reply('City not found');
        }


    })
})


bot.launch();