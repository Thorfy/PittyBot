const Discord = require('discord.js')
const bot = new Discord.Client() 
const broadcast = bot.createVoiceBroadcast();
bot.on('ready', function () {
	console.log("Je suis connecté !")

	// Set avatar
	if(!bot.user.avatar){
		bot.user.setAvatar('asset/avatar.png')
		.then(user => console.log(`New avatar set!`))
		.catch(console.error);
	}

	//Set activity
	bot.user.setActivity('Developpement', { type: 'PLAYING' })
	.then(presence => console.log(`Activity set !`))
	.catch(console.error);
	
	//Say i'm in
	// if(bot.channels.exists("name", "bot_commands")){
	// 	bot.channels.find("name", "bot_commands")
	// 	.send("I'm in!")
	// 	.catch(console.error)
	// }
	
})

bot.on('message', function(message){
	if(message.content === '!ping'){
		message.reply('pong !')
	}else if(message.content === '!dodo'){
		bot.destroy()
	}
})



bot.on('voiceStateUpdate', (oldMember, newMember) => {
	let newUserChannel = newMember.voiceChannel
	let oldUserChannel = oldMember.voiceChannel

	if(newUserChannel) {
		if(newMember.user.bot === false){
			if(newMember.user.username){
				newUserChannel.join()
				.then(connection => {
					// let dispatcher = connection.playFile('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=bonjour%20chenapan&tl=fr&total=1&idx=0&textlen=15')
					// dispatcher.on('end', function() {
					// 	connection.disconnect()
					// })
					broadcast.playStream("https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=bonjour%20chenapan&tl=fr&total=1&idx=0&textlen=19")
					dispatcher = connection.playBroadcast(broadcast);
				//	console.log(connection.playArbitraryInput('je suis un test'))
				})
			}
		}
	} else if(!newUserChannel){
		if(oldMember.user.bot === false){
			if(oldMember.user.username){
				oldUserChannel.join()
				.then(connection => {
					let dispatcher = connection.playFile('D:/PittyBot/asset/bonjourPetitePute.mp3')
					dispatcher.on('end', function() {
						connection.disconnect()
					})
				})


			}
		}
	}
	// }
	// if(newUserChannel) {
	// 	console.log("connection")
	// 	bot.channels.find("name", "bot_commands")
	// 	.send("connection")
	// 	.catch(console.error)

	// } else if(!newUserChannel){
	// 	console.log("deconnection")
	// 	bot.channels.find("name", "bot_commands")
	// 	.send("deconnection")
	// 	.catch(console.error)
	// }
})

bot.login('')
