const express = require('express');
const app = express();
app.get('/', (request, response) => {
	response.sendStatus(200);
});
app.listen(3000); // Recebe solicitações que o deixa online
const Discord = require('discord.js'); //Conexão com a livraria Discord.js
const db = require('quick.db');
const Canvas = require('canvas');
const client = new Discord.Client(); //Criação de um novo Client
const config = require('./config.json'); //Pegando o prefixo do bot para respostas de comandos



  // pasta de comandos
  
	client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
    return message.channel.send("<a:negativoanimado:782646065160781854>| Esse comando não existe verifique t!help para obter todos os comandos")
  }
});

 client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`,
      `Meu criador мr.ρrσρℓαyєr 🅿🆁🅾#8073`
      

    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("Estou Online!")
});

 // mencao

  client.on("message", msg => {
    if (msg.channel.type == 'dm') return;
    let prefix = db.get(`prefix_${msg.guild.id}`)
    if (prefix === null) prefix = `t!`;
    if (msg.content === `<@${client.user.id}>`) {
      return msg.channel.send(`${msg.author}, Meu prefix nestre servidor é ${prefix}\nuse ${prefix}help para ver meus comandos...`);
    }
    if (msg.content === `<@!${client.user.id}>`) {
      return msg.channel.send(`${msg.author}, Meu prefix nesse servidor é ${prefix}\nuse ${prefix}help para ver meus comandos...`);


    }
  });



  // welcome

  client.on("guildMemberAdd", async (member) => {
    const {registerFont} = require('canvas')
    registerFont('IndieFlower-Regular.ttf', { family: 'Indie_Flower' });
    let guild = member.guild;
    if (guild === null) return;

    let welcome = db.get(`welcome_${member.guild.id}`)
    if (welcome === null) return;

     let msg = db.get(`jointxt_${member.guild.id}`)
    if (msg === null) msg = `Bem vindo ${member} (${member.id}) espero que se divirta no servidor ${member.guild}! Agora temos ${member.guild.count}`
    
    msg = msg.replace("{member}", `${member}`)
    msg = msg.replace("{member*name}", `${member.user.username}`)
    msg = msg.replace("{member*id}", `${member.user.id}`)
    msg = msg.replace("{member*tag}", `${member.user.tag}`)
    msg = msg.replace("{guild}", `${member.guild}`)
    msg = msg.replace("{guild*count}", `${member.guild.memberCount}`)
    msg = msg.replace("{guild*id}", `${member.guild.id}`)
  const avatar = member.user.displayAvatarURL({format: "jpg"});

  var text = member.user.tag.normalize('NFKD')


  var centro = 'https://wallpaperaccess.com/full/87215.jpg'

  try {
  const canvas = Canvas.createCanvas(600, 400);
  
  const ctx = canvas.getContext('2d');
  
  const fundo = await Canvas.loadImage(centro);
  
  const avatur = await Canvas.loadImage(avatar);

  ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);

  ctx.font = '55px IndieFlower-Regular';
  ctx.fillStyle = "black";
  ctx.fillText(`Bem vindo`, 170, 250)
  ctx.fillText(`${text}`, 120, 310)

  ctx.drawImage(avatur, 200, 40, 150, 150);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bemVindo.png');


  client.channels.cache.get(welcome).send(msg, attachment) 
  } catch (err) {
    return;
  }

  }) 


 // leave
  client.on("guildMemberRemove", async (member) => {
    const {registerFont} = require('canvas')
    registerFont('IndieFlower-Regular.ttf', { family: 'Indie_Flower' });

    let guild = member.guild;
    if (guild === null) return;

    let leave = db.get(`leave_${member.guild.id}`)
    if (leave === null) return;

    let msg = db.get(`leavetxt_${member.guild.id}`)
    if (msg === null) msg = `${member.user.username} saiu do server... Espero que volte :(`

     msg = msg.replace("{member}", `${member}`)
    msg = msg.replace("{member*name}", `${member.user.username}`)
    msg = msg.replace("{member*id}", `${member.user.id}`)
    msg = msg.replace("{member*tag}", `${member.user.tag}`)
    msg = msg.replace("{guild}", `${member.guild}`)
    msg = msg.replace("{guild*count}", `${member.guild.memberCount}`)
    msg = msg.replace("{guild*id}", `${member.guild.id}`)

    const avatar = member.user.displayAvatarURL({format: "png"});

  var text = member.user.tag.normalize('NFKD')


  var centro = https

  try {
  const canvas = Canvas.createCanvas(600, 400);
  
  const ctx = canvas.getContext('2d');
  
  const fundo = await Canvas.loadImage(centro);
  
  const avatur = await Canvas.loadImage(avatar);

  ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);

  ctx.font = '55px IndieFlower-Regular';
  ctx.fillStyle = "black";
  ctx.fillText(`Bye, bye`, 170, 250)
  ctx.fillText(`${text}`, 120, 310)

  ctx.drawImage(avatur, 200, 40, 150, 150);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tchauzinho.png');

   client.channels.cache.get(leave).send(msg, attachment) 
  
  } catch (err) {
    return;
  }

  })
  
  
 client.login(process.env.TOKEN);   
