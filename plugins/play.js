let { MessageType } = require('@adiwajshing/baileys')
let yts = require('yt-search')
let fs = require('fs')
let fetch = require('node-fetch')
const { servers, yta, ytv } = require('../lib/y2mate')
let handler = async(m, { conn, command, text, isPrems, isOwner, DevMode }) => {
conn.play = conn.play ? conn.play : {}
if (!text) throw '*[βππππβ] π½πΎπΌπ±ππ΄ π³π΄ π»π° π²π°π½π²πΈπΎπ½ π΅π°π»ππ°π½ππ΄, πΏπΎπ π΅π°ππΎπ πΈπ½πΆππ΄ππ΄ π΄π» π²πΎπΌπ°π½π³πΎ πΌπ°π π΄π» π½πΎπΌπ±ππ΄/ππΈπππ»πΎ π³π΄ ππ½π° π²π°π½π²πΈπΎπ½*\n\n*ββ π΄πΉπ΄πΌπΏπ»πΎ:*\n*#play Good Feeling - Flo Rida*'
try {
let results = await yts(text)
let vid = results.all.find(video => video.seconds < 3600)
if (!vid) throw '*[βππππβ] π»πΎ ππΈπ΄π½ππΎ, π½πΎ πΏππ³π΄ π΄π½π²πΎπ½πππ°π π΄π» π°ππ³πΈπΎ/ππΈπ³π΄πΎ, πΈπ½ππ΄π½ππ΄ π²πΎπ½ πΎπππΎ π½πΎπΌπ±ππ΄/ππΈπππ»πΎ*'
let { dl_link, thumb, title, filesize, filesizeF } = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
let shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${dl_link}`)).text()
conn.sendFile(m.chat, thumb, 'error.jpg', `
π *ππΈπππ»πΎ:* ${title}
*π πΏπ΄ππΎ:* ${filesizeF}
*π πππ»:* ${vid.url}
*π₯ π³π΄ππ²π°ππΆπ°π:* ${shortUrl}
        _SapitoBot_
`.trim(), m, false, { 
contextInfo: { externalAdReply: {
title: 'Κα΄α΄Κα΄α΄α΄α΄α΄α΄Κ α΄α΄ Κα΄α΄α΄α΄Κα΄',
body: 'Β©πππππππ΅ππ‘', 
sourceUrl: `https://github.com/BrunoSobrino/SimpleBot`, 
thumbnail: fs.readFileSync('./Menu2.jpg') }}})
conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), `
*π ππΈπππ»πΎ:* ${title}
*π πΏπ΄ππΎ:* ${filesizeF}
*π πππ»:* ${vid.url}
`.trim(), m)
} catch (e) {
m.reply('*[β] π΄πππΎπ*')
}}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['general']
handler.command = /^play2?$/i
module.exports = handler
