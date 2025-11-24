import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/webhooks/:providerId/:token", async (req, res) => {
  const body = req.body;

  // Verificar o evento
  if (body.event === "CLIENT_MESSAGE") {
    const msg = body.message.text;
    const clientId = body.client_id;

    // envia para o telegram
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `Nova mensagem no Jivo de ${clientId}: ${msg}`
      })
    });

    // responde ao Jivo com uma mensagem do bot
    res.json({
      event: "BOT_MESSAGE",
      message: {
        type: "TEXT",
        text: "Tudo bem? Com o que posso te ajudar hoje?"
      }
    });
  } else {
    // outros eventos que você quiser tratar
    res.sendStatus(200);
  }
});

// roda o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server rodando na porta", PORT));
