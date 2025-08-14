const API_KEY = "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";
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  appendMessage("Bot", "Thinking...");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",

      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
  updateLastBotMessage(reply);
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(text) {
  const messages = chatBox.querySelectorAll(".message");
  const last = messages[messages.length - 1];
  if (last && last.innerHTML.includes("Bot:")) {
    last.innerHTML = `<strong>Bot:</strong> ${text}`;
  }
}
