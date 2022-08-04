const Command = require("../Structures/Command.js")
const fetch = require('isomorphic-fetch')
const { EmbedBuilder, AttachmentBuilder, PermissionFlagsBits, Colors } = require("discord.js")

module.exports = new Command({
    name: "test",
    description: "test",
    game: false,
    param: "\`<@user>\`",
    permission: PermissionFlagsBits.SendMessages,
    private: false,
    async run(args, client, message, prefix) {
        message.channel.sendTyping()

        const mention = message.mentions.users.first()
        if (!mention) return sendMessage(prefix + " " + this.param)

        const user1 = message.author.displayAvatarURL({ extension: "png", size: 512 })
        const user2 = mention.displayAvatarURL({ extension: "png", size: 512 })

        const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user1}&user2=${user2}`))
        const json = await res.json()

        const attachment = new AttachmentBuilder(json.message, { name: 'love.png' })

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
                    .setColor(Colors.Yellow)
                    .setDescription(`❤️ Seems like ${message.author.username} loves ${mention.username}!`)
                    .setImage(`attachment://${attachment.name}`)
            ],
            files: [attachment]
        })

        //====================================================================================================
        function sendMessage(description = 'some text', color = Colors.Red) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL({ dynamic: true }) })
                        .setColor(color)
                        .setDescription(description)
                ]
            })
        }

    }
})