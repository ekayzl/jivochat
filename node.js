import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/webhook", async (req, res) => {
    const data = req.body;

    console.log("Recebido do Jivo:", data);

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `Nova mensagem no JivoChat:\n\n${JSON.stringify(data, null, 2)}`
            })
        });
    } catch (err) {
        console.error("Erro ao enviar para Telegram:", err);
    }

    res.json({
        reply: "Tudo bem? Com o que posso te ajudar hoje?"
    });
});

app.get("/", (req, res) => {
    res.send("Webhook ativo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
