const Command = require("../Structures/Command.js")
const { EmbedBuilder, PermissionFlagsBits, Colors } = require("discord.js")

module.exports = new Command({
	name: "av",
	description: "Shows avatar",
	game: false,
	param: "\`<@user>\`",
	permission: PermissionFlagsBits.SendMessages,
	private: false,
	async run(args, client, message, prefix) {

		const target = message.mentions.users.first() || message.author
		const msg = message.guild.members.cache.get(target.id)
		const avatar = msg.avatar === null ? msg.user : msg

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: msg.user.tag, iconURL: avatar.avatarURL({ dynamic: true }) })
					.setColor(Colors.Green)
					.setDescription(`<@${msg.user.id}> avatar.`)
					.setImage(avatar.displayAvatarURL({ dynamic: true, size: 1024 }))
			]
		})

	}
})