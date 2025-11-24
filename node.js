import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = "SEU_TOKEN";
const CHAT_ID = "SEU_CHAT_ID";

app.post("/webhook", async (req, res) => {
    const data = req.body;

    console.log("Recebido do Jivo:", data);

    // Envia para Telegram
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
        console.error("Erro ao enviar mensagem Telegram:", err);
    }

    // --------- RESPONDER AO CLIENTE NA JIVO (EVENTO CORRETO) ---------
    if (data.event_name === "chat_started") {

        console.log("Respondendo ao cliente no Jivo...");

        // Delay de 2 segundos ANTES de responder
        setTimeout(async () => {
            try {
                await fetch("https://api.jivochat.com/webhooks/response", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        type: "message",
                        text: "Olá! Tudo bem? Já estou te atendendo 😄"
                    })
                });
            } catch (err) {
                console.error("Erro ao enviar resposta automática:", err);
            }
        }, 2000);
    }

    // Resposta pro webhook
    res.json({ ok: true });
});

app.get("/", (req, res) => {
    res.send("Webhook ativo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
