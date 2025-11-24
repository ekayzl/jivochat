import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// COLOQUE SEU TOKEN E CHAT ID AQUI
const TELEGRAM_TOKEN = "8135423857:AAHa_5uFQO_mshsZCj0oQdB4ngc8UThxu-w";
const CHAT_ID = "8436274548";

// Webhook principal da Jivo
app.post("/webhook", async (req, res) => {
    const data = req.body;

    console.log("Recebido do Jivo:", data);

    // Enviar para Telegram
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `Nova mensagem do Jivo:\n\n${JSON.stringify(data, null, 2)}`
            })
        });
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
    }

    // Enviar resposta automática depois de 2 segundos
    setTimeout(() => {
        console.log("Respondendo ao Jivo...");

        // Isso manda uma resposta automática
        // A Jivochat entende como uma resposta do bot
        // e mostra pro cliente
        res.json({
            type: "message",
            text: "Olá! Tudo bem? Já estou te atendendo 😄"
        });
    }, 2000); // 2 segundos
});

// Home
app.get("/", (req, res) => {
    res.send("Webhook ativo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
