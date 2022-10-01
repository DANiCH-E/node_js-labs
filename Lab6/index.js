const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api');
const fs = require('fs');
const api = require('covidapi');
api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
const bot = new Telegraf('5398119545:AAHu7WsjZn6lHX1vPFBYfIS9bdzAFE3kdxc');
bot.start( ctx => ctx.reply(`
   Привет ${ctx.from.first_name}!
   Узнай статистику по Коронавирусу.
   Введи страну на английском языке и получи статистику.
   Введи /data для импорта данных.`
))


bot.command('data', (ctx) => {
	ctx.replyWithDocument({source: 'Data.json'})
})

bot.on('text', async (ctx) => {
   try {
       const userText = ctx.message.text
       const covidData = await covidApi.getReportsByCountries(userText)
       const countryData = covidData[0][0]
       const formatData = 
       `\nСтрана: ${countryData.country},
           Случаи: ${countryData.cases},
           Смерти: ${countryData.deaths},
           Выздоровело: ${countryData.recovered}`
       ctx.reply(formatData)
       fs.appendFile('Data.json', formatData, err =>{
       	if (err) throw err;
       })
   } catch(e) {
       ctx.reply('Такой страны не существует, попробуйте еще раз.')
   }
})
bot.launch()