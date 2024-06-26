const express = require("express");
const app = express();
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv").config({ path: ".env" });
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const ytdl = require("ytdl-core");

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running for youtube video downloader bot",
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (messageText === "/start") {
    let user =
      msg.chat.id +
      " \n name: " +
      msg.chat.first_name +
      " " +
      msg.chat.last_name +
      " \n username: " +
      msg.from.username +
      " \n is bot:" +
      msg.from.is_bot +
      " \n language_code: " +
      msg.from.language_code;

    fs.appendFile("user.txt", user, (err) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
    bot.sendMessage(chatId, "Hello, please send me YouTube video link");
  } else if (messageText.startsWith("http")) {
    try {
      const info = await ytdl.getInfo(messageText);
      const format = ytdl.chooseFormat(info.formats, { quality: "18" });
      const videoUrl = format.url;
      //      const video = ytdl
      //      .downloadFromInfo(info, { format: format })
      //    .then((video) => {
      bot.sendMessage(chatId, videoUrl);
      //  });
    } catch (error) {
      bot.sendMessage(chatId, "sorry, there was error fetching video");
    }
  }
});
app.listen(3000, () => console.log("Server is on 3000"));
