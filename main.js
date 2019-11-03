const fs = require("fs"),
	Telegraf = require('telegraf'),
	app = new Telegraf(fs.readFileSync("settings.txt", "utf8"));


app.hears('/schedule', ctx => {
	ctx.replyWithMarkdown('Пока ничего не готово.');
});

app.startPolling();