module.exports.run = async (bot, message, args) => {
  bot.sendMessage(message.chat.id, "Teste");
}

module.exports.config = {
  name: 'help',
  aliases: ['h'] // Even if you don't want an alias, leave this as an array.
}