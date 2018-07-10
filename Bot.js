const Discord = require('discord.js')
const DiscordConfig = require('./config/Discord-PittyBot.json')
const textToSpeech = require('@google-cloud/text-to-speech')
const textToSpeechClient = new textToSpeech.TextToSpeechClient()
const fs = require('fs')
const bot = new Discord.Client()

bot.on('ready', function () {
	console.log("Bot Connected")

    // Set avatar
    if (!bot.user.avatar) {
    	bot.user.setAvatar('asset/avatar.png').catch(console.error);
    }

    //Set activity
    bot.user.setActivity('Développement', {type: 'PLAYING'}).catch(console.error);

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

	if (newUserChannel) {
		if (newMember.user.bot === false) {
            //console.log(newUserChannel)
            if (newMember.user.username) {
            	newUserChannel.join()
            	.then(connection => {


            		let text = `Bonjour ${newMember.user.username} !`
            		var name = Date.now();


            		const request = {
            			input: {text: text},
            			voice: {languageCode: 'fr-FR', ssmlGender: 'FEMALE'},
            			audioConfig: {audioEncoding: 'MP3'},
            		};
            		console.log('call tts api')
            		textToSpeechClient.synthesizeSpeech(request, (err, response) => {
            			if (err) {
            				console.error('ERROR:', err);
            				return;
            			}
            			//console.log(response)
            			var outputFile = `D:/PittyBot/PittyBot/asset/output/${name}.mp3`;
            			fs.writeFile(outputFile, response.audioContent, 'binary', err => {
            				if (err) {
            					console.error('ERROR:', err);
            					return;
            				}

            				//console.log(`Audio content written to file: ${outputFile}`);
            				if (fs.existsSync(outputFile)) {
            					console.log('find file lets play')
            					let dispatcher = connection.playFile(outputFile)
            					dispatcher.on('end', function(){
            						console.log('play end')
            						connection.disconnect()
            						fs.unlinkSync(outputFile)
            						console.log(`${name} removed !`)
            						
            					})
            				}
            			});
            		});

                            // var path = `D:/PittyBot/PittyBot/asset/son/${newMember.user.username}.mp3`;


                            // if (fs.existsSync(path)) {
                            //     let dispatcher = connection.playFile(path)
                            //     dispatcher.on('end', function () {
                            //         connection.disconnect()
                            //     })
                            // } else {
                            //     let dispatcher = connection.playFile("D:/PittyBot/PittyBot/asset/son/MT.mp3")
                            //     dispatcher.on('end', function () {
                            //         connection.disconnect()
                            //     })
                            // }

                        })
            }
        }
    } else if (!newUserChannel) {

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



bot.on('message', function (message) {

	//commands.match(message)


	if (message.content === '!ping') {
		console.log(`${message} trig`)
		message.reply('pong !')
	} else if (message.content === '!dodo') {
		console.log(`${message} trig`)
		bot.destroy()
	} else if ((message.content === '!pierre') || (message.content === '!papier') || (message.content === '!ciseau')) {
		console.log(`${message} trig`)
		var shifumi = ["pierre", "papier", "ciseau"]
		var index = Math.floor((Math.random() * Math.floor(3)))
		message.reply(`${shifumi[index]}!`)
	}else if(message.content.startsWith('-tts')) {
		console.log('trig tts')
		let args = message.content.split(' ')
		args.shift()
		let text = args.join(' ');
		console.log(text)
		var name = Date.now();

		//console.log(message.author.username)
		//console.log()
		const request = {
			input: {text: text},
			voice: {languageCode: 'fr-FR', ssmlGender: 'FEMALE'},
			audioConfig: {audioEncoding: 'MP3'},
		};

		textToSpeechClient.synthesizeSpeech(request, (err, response) => {
			if (err) {
				console.error('ERROR:', err);
				return;
			}
			var outputFile = `D:/PittyBot/PittyBot/asset/output/${name}.mp3`;
			console.log(response)
			fs.writeFile(outputFile, response.audioContent, 'binary', err => {
				if (err) {
					console.error('ERROR:', err);
					return;
				}
				if (fs.existsSync(outputFile)) {
					console.log('find file lets play')
					//console.log(bot.channels)
					bot.channels.find("id", message.member.voiceChannelID).join()
					.then(connection => {
						let dispatcher = connection.playFile(outputFile)
						dispatcher.on('end', function(){
							console.log('play end')
							connection.disconnect()
							fs.unlinkSync(outputFile)
							console.log(`file removed !`)
						})
					})
				}
			}) 
		})
	}

})

/////////////////////////////////////////////////////////////:TO DO //////////////////////////////////////////////////////////////////////
//Premiere etape revu de code 




// gestionnaire de commande : insurportable de gerer chaque commande par un if
// gestionnaire d'appelle au text-to-speech, a voir pour crer une classe correspondante
// gestionnaire d'event : => onconnect, onwritemessage, onFirstCOnnect, onDisconnet ? , onMuted
// gestionnaire de config -> pas ouf de foutre toute les clefs dans le code comme ça 

// faire un système propre pour git
// refaire la structure du package node -> package.json etc

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deuxieme etape avancer dans le code

//essayer de ne plus passer par les fichier avec fs mais directement passer dans la memoire via le stream ou autre (cf doc stream avec fs)
//reconnaissance vocal a voir, pas sur que ça marche mais on sait jamais-> google cloud api a voir pour gerer les credentiel correpctement parceque c'est archi chiant 

bot.login(DiscordConfig.key)
