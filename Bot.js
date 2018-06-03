const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()

bot.on('ready', function () {
	console.log("Je suis connecté !")

	// Set avatar
	if(!bot.user.avatar){
		bot.user.setAvatar('asset/avatar.png').catch(console.error);
	}

	//Set activity
	bot.user.setActivity('Developpement', { type: 'PLAYING' }).catch(console.error);
	
	//Say i'm in
	// if(bot.channels.exists("name", "bot_commands")){
	// 	bot.channels.find("name", "bot_commands")
	// 	.send("I'm in!")
	// 	.catch(console.error)
	// }
	
})



// when someone join vocal chan pittyBot say hi {username}! 
bot.on('voiceStateUpdate', (oldMember, newMember) => {
	let newUserChannel = newMember.voiceChannel
	let oldUserChannel = oldMember.voiceChannel

	if(newUserChannel) {
		if(newMember.user.bot === false){
			console.log(newUserChannel)
			if(newMember.user.username){
				newUserChannel.join()
				.then(connection => {
					var path = `D:/PittyBot/asset/bonjour/${newMember.user.username}.mp3`;
					if (fs.existsSync(path)) {
						let dispatcher = connection.playFile(path)
						dispatcher.on('end', function() {
							connection.disconnect()
						})
					}else{
						let dispatcher = connection.playFile("D:/PittyBot/asset/bonjour/inconnue.mp3")
						dispatcher.on('end', function() {
							connection.disconnect()
						})
					}
					
				})
			}
		}
	} else if(!newUserChannel){
		
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



bot.on('message', function(message){
	if(message.content === '!ping'){
		message.reply('pong !')
	}else if(message.content === '!dodo'){
		bot.destroy()
	}else if((message.content === '!pierre') || (message.content === '!papier') || (message.content === '!ciseau')){
		var shifumi = ["puit","pierre","papier","ciseau"]
		var index = Math.floor((Math.random() * 3)+1)
		console.log(index)
		message.reply(`${shifumi[index]}!`)
	}

})

bot.login('')
