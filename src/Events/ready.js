const Event = require("../Structures/Event.js")
const { ActivityType } = require("discord.js")
const { format } = require("date-fns")

module.exports = new Event("ready", async (client) => {

    const date = format(client.readyAt.getTime() + 25200000, 'yyyy-MM-dd HH:mm:ss')

    client.user.setActivity({ name: `Bot start ${date}`, type: ActivityType.Playing })

    console.log(`${client.user.username} is online!`)
})
