const fs = require('fs'),
      Telegraf = require('telegraf'),
      app = new Telegraf(fs.readFileSync("settings.txt", "utf8"));
const readline = require('readline');
const {google} = require('googleapis');
var jsonSecret = fs.readFileSync("secret.json", "utf8"),
    secretParse = JSON.parse(jsonSecret),
    jsonSecretChatID = fs.readFileSync("secretChatID.json", "utf8"),
    secretParseChatID = JSON.parse(jsonSecretChatID),
    shifterMe = '',
    whenIWorkingvar ='';
    
function telegramChat(shifter) {
    return shifter + ' ' + secretParse[shifter];
};

function startOfWeek(date)
  {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
 
  }


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
function doIt() {
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});
};
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/*
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
/*
function whoIsToday(row, timeNow) {
    if ((row[(timeNow.getDate()-1)]=='ночь') && ((8>timeNow.getHours()) || (timeNow.getHours()>20))) {
        return resultToday = '\n_Сейчас в смене: ' + telegramChat(row[0]) + '_\n';
    } else if ((row[timeNow.getDate()]=='день') && ((timeNow.getHours()<20) && (8<timeNow.getHours()))) {
        return resultToday = '\n_Сейчас в смене: ' + telegramChat(row[0]) + '_\n';
    };
};
*/
var x = fs.readFileSync("googleApiSpreadsheet.txt", "utf8");
var result = '',
    resultToday = '',
    PhotoResult = '';
    
function listMajors(auth) {
  let d = (new Date);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: x,
    range: 'A2:AF9',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      // Print columns A and E, which correspond to indices 0 and 4.
      result = '';
      resultToday = '';
      rows.map((row) => {
      // console.log(`${row[0]} ${row[d]}`);
      if (row[d.getDate()]=='день') {
        result += 'В день(c 8:00 до 20:00): ' + telegramChat(row[0]) + '\n'
/*        whoIsToday(row, d);
        result += resultToday; */
      }
});
rows.map((row) => {
  if (row[d.getDate()]=='ночь') {
    result += 'В ночь(c 20:00 до 8:00 на '+ (d.getDate()+1) + ' число): ' + telegramChat(row[0]) + '\n'
/*        whoIsToday(row, d);
    result += resultToday; */
}
});
rows.map((row) => {
  if ((row[d.getDate()]=='ночь') && ((20<=d.getHours()) || (8>d.getHours()))) {
    resultToday = '\nСейчас в смене: ' + telegramChat(row[0]);
    result += resultToday;
  } else if ((row[d.getDate()]=='день') && ((d.getHours()<20) && (8<d.getHours()))) {
    resultToday = '\nСейчас в смене: ' + telegramChat(row[0]);
    result += resultToday;
  };
});

    } else {
      console.log('No data found.');
    }
  });
  return result;
};

// Функция для расписания

function whenIWorking() {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), whenIWorkingFunc);
  });
  };

var workDays ='',
    workNights ='';
    daysOfWeek = '';
    nightsOfWeek = '';


function whenIWorkingFunc(auth) {
  PhotoResult = `<table border="1"><tr><th>Сменщик</th><th>Понедельник</th><th>Вторник</th><th>Среда</th><th>Четверг</th><th>Пятница</th><th>Суббота</th><th>Воскресенье</th></tr><tr><td>${shifterMe}</td>`;
  let d = (new Date);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: x,
    range: 'A2:AF9',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      // Print columns A and E, which correspond to indices 0 and 4.
      workDays = 'Работаешь в день: '
      workNights = 'Работаешь в ночь: '
      daysOfWeek = ''
      rows.map((row) => {
      if (row[0]==shifterMe) {
        row.forEach(function(item,i){
          if (i > (startOfWeek(d).getDate()-1) && i <= (startOfWeek(d).getDate()+6)) {
            PhotoResult += `<td>${item}</td>`;
          }
          if (item=='день') {
            workDays += i + '; ';
            if (i > (startOfWeek(d).getDate()) && i < (startOfWeek(d).getDate()+6)) {
              if (i == ((startOfWeek(d).getDate()+5) || (startOfWeek(d).getDate()+6)) ) { 
                daysOfWeek += 'В выходной: ' + i + '; '} 
              else {
                daysOfWeek += i + '; ';
              };
            };
          } else if (item=='ночь'){
            workNights += i + '; ';
            if (i > (startOfWeek(d).getDate()) && i <= (startOfWeek(d).getDate()+6)) {
              if (i == ((startOfWeek(d).getDate()+5) || (startOfWeek(d).getDate()+6)) ) { 
                nightsOfWeek += 'В выходной: ' + i + '; '} 
              else {
              nightsOfWeek += i + '; ';
              };
            };
          };
         
        });
        PhotoResult += `</tr></table>`; // for photo

        whenIWorkingvar = `Сегодня ${(new Date).getDate()} число.\n`;
        whenIWorkingvar += `${workDays}\n${workNights}\n\nНа этой неделе работаешь: \nВ день:${daysOfWeek}\nВ ночь: ${nightsOfWeek}`;
        
        console.log(whenIWorkingvar);

      }
});




    } else {
      console.log('No data found.');
    }
  });
  return whenIWorkingvar;PhotoResult;
};


//Конец функции для расписания



async function newTimer(ctx,s) {
  ctx.replyWithMarkdown(`Забираю данные со страницы с расписанием. Это займет ${s} секунд`);
  while (s>0) {
    await sleep(1000);
    ctx.telegram.editMessageText(
      ctx.update.message.chat.id,
      ctx.update.message.message_id+1,
      ctx.update.message.message_id+1,
      `Забираю данные со страницы с расписанием. Это займет ${s} секунд`,
    )
    s--;  
}
}


async function timer(ctx){
  ctx.replyWithMarkdown('Забираю данные со страницы с расписанием. Это займет 5 секунд');
  console.log(ctx.update.message.message_id);
  console.log(ctx.update.message.chat.id);
  await sleep(1000);
  ctx.telegram.editMessageText(
    ctx.update.message.chat.id,
    ctx.update.message.message_id+1,
    ctx.update.message.message_id+1,
    `Забираю данные со страницы с расписанием. Это займет 4 секунды`,
  );
  await sleep(1000);
  ctx.telegram.editMessageText(
    ctx.update.message.chat.id,
    ctx.update.message.message_id+1,
    ctx.update.message.message_id+1,
    `Забираю данные со страницы с расписанием. Это займет 3 секунды`,
  );
  await sleep(1000);
  ctx.telegram.editMessageText(
    ctx.update.message.chat.id,
    ctx.update.message.message_id+1,
    ctx.update.message.message_id+1,
    `Забираю данные со страницы с расписанием. Это займет 2 секунды`,
  );
  await sleep(1000);
  ctx.telegram.editMessageText(
    ctx.update.message.chat.id,
    ctx.update.message.message_id+1,
    ctx.update.message.message_id+1,
    `Забираю данные со страницы с расписанием. Это займет 1 секунду`,
  );
};

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
};


webshot = require('webshot');
function PhotoScheldue(PhotoResult, ctx) {
webshot(`<html><body>${PhotoResult}</body></html>`, `./temp/hello_world_${ctx.update.message.chat.id}.png`, {siteType:'html', 
screenSize: {
  width: 700
, height: 100
}}, function(err) {
});
setTimeout(function(){
  return ctx.replyWithPhoto({ source: fs.createReadStream(`./temp/hello_world_${ctx.update.message.chat.id}.png`) });
},5000);
};

app.hears('/today', ctx => {
    doIt();
    timer(ctx);
    setTimeout(function(){
    return ctx.telegram.editMessageText(
      ctx.update.message.chat.id,
      ctx.update.message.message_id+1,
      ctx.update.message.message_id+1,
      result);
    },5000);

    console.log(ctx.from);
        var json = JSON.stringify(ctx.from) + ',\n';
        fs.appendFile("users.json", json , function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
         });
});

app.hears('/start', ctx => {
	ctx.replyWithMarkdown('Чтобы посмотреть расписание сменщиков тех.отдела на сегодня вызови команду /today');
});  

var shifterID = '';
app.hears(`/me`, ctx => {
  PhotoResult = '';
  shifterID = ctx.from.id;
  shifterMe = secretParseChatID[shifterID];
  if (secretParseChatID[shifterID]) {
    console.log(shifterMe);
    whenIWorking();
    timer(ctx);
      setTimeout(function(){
      return ctx.telegram.editMessageText(
        ctx.update.message.chat.id,
        ctx.update.message.message_id+1,
        ctx.update.message.message_id+1,
        whenIWorkingvar);
      },5000);
      if (PhotoResult=='') {
        setTimeout(function(){
          PhotoScheldue(PhotoResult, ctx);
        },4000)
      } else {
        PhotoScheldue(PhotoResult, ctx);
      };
      
  } else {
    return ctx.replyWithMarkdown('Данная функция предназначена только для сменщиков.');
  }

});

app.startPolling();