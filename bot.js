const express = require("express");
const app = express();

const TelegramBot = require("node-telegram-bot-api");
const token = "7099528174:AAHNoOq1bESF5ApDbX4S3tTTVMb8M06wM9c";
const bot = new TelegramBot(token, { polling: true });
const ytdl = require("ytdl-core");

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (messageText === "/start") {
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
      console.log(info);
    } catch (error) {
      console.log("Error in fetching", error);
      bot.sendMessage(chatId, "sorry, there was error fetching video");
    }
  }
});
app.listen(3000, () => console.log("Server is on 3000"));
