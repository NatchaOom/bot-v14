const Discord = require("discord.js")
const { Guilds, GuildMessages, MessageContent, GuildMembers, GuildMessageReactions } = Discord.GatewayIntentBits
const { AsciiTable3 } = require('ascii-table3')
const fs = require("fs")
require("dotenv").config()

module.exports = class Client extends Discord.Client {
	constructor() {
		super({
			intents: [Guilds, GuildMessages, MessageContent, GuildMembers, GuildMessageReactions]
		})

		this.commands = new Discord.Collection()
		this.dotenv = process.env
		this.prefix = process.env.PREFIX

	}

	async start(token) {
		const commandsArray = []
		fs.readdirSync("./src/Commands").filter(file => file.endsWith(".js")).forEach(file => {
			const command = require(`../Commands/${file}`)
			commandsArray.push([command.name, command.description, '  ✔️'])
			this.commands.set(command.name, command)
		})
		console.log(new AsciiTable3("COMMANDS").setHeading('Command Name', 'Description', 'loaded').setStyle("unicode-double").addRowMatrix(commandsArray).toString())

		const eventArray = []
		fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(file => {
			const event = require(`../Events/${file}`)
			eventArray.push([event.event, '  ✔️'])
			this.on(event.event, event.run.bind(null, this))
		})
		console.log(new AsciiTable3("EVENTS").setHeading('Event Name', 'loaded').setStyle("unicode-double").addRowMatrix(eventArray).toString())

		this.login(token)
	}
}