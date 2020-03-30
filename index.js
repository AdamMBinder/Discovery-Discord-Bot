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

// Server Greeting

bot.on('guildMemberAdd', member => {

	const channel = member.guild.channels.cache.find(channel => channel.name === "general");
	if (!channel) return;

	channel.send('Welcome to the demo server, ${member}! Upload an image to test me out. Type !help for more information. Enjoy!')
});

bot.on('message', async message=>{

	let args = message.content.substring(PREFIX.length).split(" ");

	switch(args[0]) {
		case 'ping':
			message.channel.send('pong!')
		break;

		case 'about':
			const about = new Discord.MessageEmbed()
			.setTitle('Discovery Bot')
			.addField('Developed By:', 'Adam Binder')
			.addField('Created For:', 'Hack Brooklyn 2020')
			.addField('Version', '1.1.0')
			.setColor(0xF1C40F)
			.setThumbnail('https://cdn.discordapp.com/attachments/693964124840788031/694002373479366686/d193c500-6cee-4974-a385-f4a03a6103be_200x200.png')
			.setFooter('Thanks for using Discovery Bot!')
			message.channel.send(message.author, about);
		break;

		case 'help':
			const help = new Discord.MessageEmbed()
			.setTitle('Discovery Bot')
			.addField('How to Use', 'Simply upload an image (.jpg, .jpeg, or .png formats) and Discovery Bot will identify and transcribe your image automatically.')
			.addField('Commands', '!help - What you see right now!\n!about - Who made me and what version I am!\n??? - A secret command, can you find it?' )
			.setColor(0xF1C40F)
			.setThumbnail('https://cdn.discordapp.com/attachments/693964124840788031/694002373479366686/d193c500-6cee-4974-a385-f4a03a6103be_200x200.png')
			.setFooter('Thanks for using Discovery Bot!')
			message.channel.send(message.author, help);
		break;

		case 'surprise':
			message.author.send('https://www.youtube.com/watch?v=71gHLPmEeCk')
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