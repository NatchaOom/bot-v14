const Event = require("../Structures/Event.js")
const { EmbedBuilder, Colors } = require("discord.js")

module.exports = new Event("messageCreate", (client, message) => {

    if (message.author.bot) return
    if (!message.content.startsWith(client.prefix)) return

    let args = message.content.substring(client.prefix.length).split(/ +/)

    const command = client.commands.find(cmd => cmd.name == args[0])
    if (!command) return

    args.shift()
    if (!args.length) args = false

    const perm = message.member.permissions.has(command.permission)
    if (!perm) return sendMessage(`<@!${message.author.id}> \nYou do not have the permissions`)

    command.run(args, client, message, [client.prefix, command.name].join(''))

    //====================================================================================================
    function sendMessage(description, color = Colors.Red) {
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setColor(color)
                    .setDescription(description)
            ]
        })
    }

})