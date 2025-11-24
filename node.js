app.post("/webhook", async (req, res) => {
    const data = req.body;

    console.log("Recebido do Jivo:", data);

    // Enviar mensagem pro Telegram
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
        console.error("Erro ao enviar mensagem:", err);
    }

    // ****** RESPOSTA AUTOMÁTICA APÓS 2 SEGUNDOS ******
    setTimeout(() => {
        res.json({
            reply: "Tudo bem? Como posso te ajudar hoje?"
        });
    }, 2000);
});
