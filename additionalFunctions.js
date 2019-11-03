// Parse a file
var xlsx = require('node-xlsx').default;

const workSheetsFromFile = xlsx.parse(`table.xlsx`);

function telegramChat(shifter) {
    switch (shifter) {
        case 'Моисейченко Александр':
            console.log('!!!!!!!');
            return shifter + ' его Телеграм @';
          break;
        case 'Псевдоним Миши':
            console.log('Мишка');
            return shifter + ' его Телеграм @';
          break;
    }
};


function message() {
    let d = (new Date).getDate();
	let result ='Сегодня ' + d + ' число. Дежурные на сегодня:\n';
	workSheetsFromFile[0]['data'].forEach(function(item, i, arr) {
		if (item[d]=='день') {
			result += 'В день(c 8:00 до 20:00): ' + telegramChat(item[0]) + '\n'
		};
		if (item[d]=='ночь') {
			result += 'В ночь(c 20:00 до 8:00 на '+ (d+1) + ' число): ' + telegramChat(item[0]) + '\n'
        }
        return result;
	});
	return result;
};

module.exports.message = message;