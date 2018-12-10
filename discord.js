const Discord = require('discord.js')
const client = new Discord.Client();


client.on('ready',() => {
    console.log('Bot logged in as ' + client.user.tag)
})

client.login(process.env.token);

module.exports = client;