const Discord = require('discord.js');
const vision = require('@google-cloud/vision');
const {Client, Attachment} = require('discord.js');
const fs = require('fs');
const path = require('path');
const bot = new Client();

// Put your Google API .json key in your .env file if you are hosting the bot yourself
fs.writeFileSync(path.join(__dirname, 'gcloud-credentials.json'), process.env.SERVICE_ACCOUNT_JSON);

 // Creates Cloud Vision client
const client = new vision.ImageAnnotatorClient();

// Put your Discord Bot API token in your .env file if you would like to make your own bot
const token = process.env.TOKEN;

const PREFIX = '!';

bot.on('ready', () => {
	console.log('This bot is online!');
	bot.user.setActivity('Hack Brooklyn 2020!', { type: 'PLAYING'}).catch(console.error);
})

bot.on('message', async message=>{

	let args = message.content.substring(PREFIX.length).split(" ");

	switch(args[0]) {
		case 'ping':
			message.channel.send('pong!')
		break;

		case 'embed':
			const embed = new Discord.MessageEmbed()
			.setTitle('User Information')
			.addField('Player Name', message.author.username)
			.addField('Version', version)
			.addField('Current Server', message.guild.name)
			.setColor(0xF1C40F)
			.setThumbnail(message.author.displayAvatarURL())
			.setFooter('Test Footer')
			message.channel.send(embed);
		break;

		case 'send':
			const attachment = new Discord.MessageAttachment('https://i.imgur.com/ZOKp8LH.jpg')
			message.channel.send(message.author, attachment);
		break;

		case 'surprise':
			message.author.send('https://www.youtube.com/watch?v=71gHLPmEeCk');
		break;

		default:
		
		        if (message.attachments.size > 0) {
            if (message.attachments.every((a) => a.url.indexOf("png", a.url.length - 3) !== -1)) {
                
				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3, true)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel, true)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})


            } else if (message.attachments.every((a) => a.url.indexOf("jpeg", a.url.length - 4) !== -1)) {

				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})

            } else if (message.attachments.every((a) => a.url.indexOf("jpg", a.url.length - 3) !== -1)) {

				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3, true)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel, true)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})

            } else if (message.attachments.every((a) => a.url.indexOf("PNG", a.url.length - 3) !== -1)) {

				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3, true)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel, true)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})

            } else if (message.attachments.every((a) => a.url.indexOf("JPEG", a.url.length - 3) !== -1)) {

				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3, true)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel, true)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})

            } else if (message.attachments.every((a) => a.url.indexOf("JPG", a.url.length - 3) !== -1)) {

				let result = await getInfo(message.attachments.first().proxyURL);
				const embed = new Discord.MessageEmbed()
				.setTitle(message.author.username + ' Image Alt Text')
				.addField('Alt Text:', result.label1 + ', ' + result.label2 + ', ' + result.label3, true)
				.setColor(0xF1C40F)
				.setThumbnail(message.attachments.first().url)
				.setFooter('Help me learn! Please react with ✅ or ❌')
				if (result.webLabel.length > 0) {
					embed.addField('Best Guess:', result.webLabel, true)
				}
				if (result.text.length > 0) {
					embed.addField('Transcription:', result.text)
				}
				message.channel.send(embed).then(sentEmbed => {
   				 	sentEmbed.react("✅")
    				sentEmbed.react("❌")
				})

            } else {

                message.channel.send("Error detecting image - please try again!")

            }
        }


	}
})

async function getInfo(url){
    let result = await connectVision(url);
  // console.log("Result:");
  // console.log(result);
  	return result;
}

async function connectVision(url) {
 	 const [result] = await client.labelDetection(url);
 	 const [ocr] = await client.documentTextDetection(url);
 	 const [web] = await client.webDetection(url);
 	 // const webDetection = web.webDetection.bestGuessLabels[0].label

 	// console.log("Result: ")
 	// console.log(webDetection.bestGuessLabels[].label);
     let description = {label1:result.labelAnnotations[0].description, label2:result.labelAnnotations[1].description, label3:result.labelAnnotations[2].description, webLabel:"", text:""};

	 if (web.webDetection !== null) {
     	description.webLabel = web.webDetection.bestGuessLabels[0].label
     }

     if (ocr.fullTextAnnotation !== null) {
     	description.text = ocr.fullTextAnnotation.text
     }

     // console.log("Description: ");
     // console.log(description);

    return description;
}


bot.login(token);