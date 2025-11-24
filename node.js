import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = "8135423857:AAHa_5uFQO_mshsZCj0oQdB4ngc8UThxu-w";
const CHAT_ID = "8436274548";

app.post("/jivo-webhook", async (req, res) => {
  try {
    const body = req.body;

    const from = body.visitor?.name || "Visitante";
    const message = body.message?.text || "(Sem texto)";

    const text = `📩 Nova mensagem no JivoChat\n\n👤 De: ${from}\n💬 Mensagem: ${message}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text
      })
    });

    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("erro");
  }
});

app.listen(3000, () => console.log("Webhook Jivo rodando na porta 3000"));
