const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: RavenConnect,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function JAPHETTECH() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let client = JaphetxmdConnect({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			client.ev.on('creds.update', saveCreds)
			client.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
				await client.sendMessage(client.user.id, { text: 'JAPHET-XMD GENERATING YOUR SESSION_ID..WAIT A MOMENT' });
					await delay(50000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(8000);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await client.sendMessage(client.user.id, { text: '' + b64data });
	
let Textt = "```JAPHET-XMD HA BEEN LINKED TO YOUR WHATSAPP ACCOUNT! DO NOT SHARE THIS SESSION_ID WITH ANYONE.\n\nCOPY AND PASTE IT ON THE SESSION STRING DURING DEPLOY AS IT WILL BE USED FOR AUTHENTICATION.\n\nINCASE YOU ARE FACING ANY ISSUE REACH ME VIA HERE 👇\n\nhttps://wa.me/255613914546\n\nAND DON'T FORGET TO SLEEP 😴, FOR EVEN THE RENTLESS MUST RECHARGE ⚡.\n\nGOODLUCK 🎉.```"
	
			await client.sendMessage(client.user.id,{ text: Textt }, {quoted: session })


					await delay(100);
					await client.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					JAPHETTECH();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await JAPHETTECH()
});
module.exports = router
