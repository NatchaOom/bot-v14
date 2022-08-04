const Client = require("./Client.js")
const { Message } = require("discord.js")

/**
 * @param {string[]} args
 * @param {Client} client
 * @param {Message} message
 * @param {String} prefix
 */

function RunFunction(args, client, message, prefix) {}

module.exports = class Command {
	/**
	 * @typedef {{name: string, description: string, game: boolean, param: string, permission: string, private: boolean, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name
		this.description = options.description
		this.game = options.game
		this.param = options.param
		this.permission = options.permission
		this.private = options.private
		this.run = options.run
	}
}