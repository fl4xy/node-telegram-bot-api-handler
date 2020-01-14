const TelegramBot = require('node-telegram-bot-api');
const config = require("./config.json");
const client = new TelegramBot(config.token, {polling: true});
const requireAll = require('require-all');

const events = () => {
	const files = requireAll({                   
  		dirname: `${__dirname}/events`,            
  		filter: /^(?!-)(.+)\.js$/                 
	});                                          

	for (const name in files) {                  
  		const event = files[name];                 
                                             
  		client.on(name, event.bind(null, client));
  		
  		client.on("polling_error", (err) => console.log(err)); // Show polling Errors
                                             
  		console.log(`Evento Carregado: ${name}`);      
	}
}

const commands = () => {
	const files = requireAll({                 
  		dirname: `${__dirname}/commands`,          
  		filter: /^(?!-)(.+)\.js$/                  
	});                                         

	client.commands = new Map();                 
	client.aliases = new Map();                 

	for (const name in files) {                 
		const cmd = files[name];                   
	                                         
		client.commands.set(cmd.config.name, cmd); 
		for (const a of cmd.config.aliases) client.aliases.set(a, cmd.config.name);

		console.log(`Comando Carregado: ${cmd.config.name}`);
	}           
}

module.exports = {events, commands}