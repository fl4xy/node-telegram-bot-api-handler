module.exports = (client, message) => {
  	const prefix = '!';
	const [cmd, ...args] = message.text.trim().slice(prefix.length).split(/\s+/g);

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (command) {
  		command.run(client, message, args);
  		console.log(`Executando o comando: [${command.config.name}] | Executado por: [${message.from.first_name}]`);
	}
};