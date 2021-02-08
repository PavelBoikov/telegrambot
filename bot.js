require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');
const COUNTRIES_LIST = require('./constants');

http.createServer(onRequest).listen(process.env.PORT || 6000);


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.help((ctx) => ctx.reply(COUNTRIES_LIST));
bot.start((ctx) => ctx.reply(`
Привет ${ctx.message.from.first_name}!
Я показываю статистику по кароновирусу.
Чтобы узнать статистику по кароновирусу напиши название страны на английском языке.
Если вы не знаете ка пишится страна которую вы хотите узнать , то напишите команду /help 
и увидите полный список стран. 
` 
));
bot.on('text', async (ctx) => {
  let data = {};
  try {
   data = await api.getReportsByCountries(ctx.message.text);
    const formdata = `
    Страна: ${data[0][0].country}
    Случаи: ${data[0][0].cases}
    Случаев смерти: ${data[0][0].deaths}
    Выздоровело: ${data[0][0].recovered}
    `;
    ctx.reply(formdata);
  } 
  catch 
  {
    ctx.reply('Извините но вы неправильно ввели страну , попробуйте еще раз или воспользуйтесь командой /help');
  }
  
});
bot.launch();
