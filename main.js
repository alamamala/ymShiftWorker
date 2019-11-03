const fs = require("fs"),
	  Telegraf = require('telegraf'),
	  app = new Telegraf(fs.readFileSync("settings.txt", "utf8"));
var additionalFunctions = require('./additionalFunctions');


app.hears('/today', ctx => {
	ctx.replyWithMarkdown(additionalFunctions.message());
});

app.hears('/start', ctx => {
	ctx.replyWithMarkdown('Пока ничего не готово, но можно попробовать, команду /today');
});

app.startPolling();