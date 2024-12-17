document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatOutput = document.getElementById("chat-output");

    let step = 0;
    let userDetails = { name: "", email: "", message: "" };

    function botReply(message) {
        chatOutput.innerHTML += `<div><strong>Bot:</strong> ${message}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function userReply(message) {
        chatOutput.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    }

    chatSend.addEventListener("click", () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        userReply(userMessage);
        chatInput.value = "";

        // Step-based Conversation
        if (step === 0) {
            botReply("Hello! What’s your name?");
            step++;
        } else if (step === 1) {
            userDetails.name = userMessage;
            botReply(`Nice to meet you, ${userDetails.name}! Can I have your email?`);
            step++;
        } else if (step === 2) {
            userDetails.email = userMessage;
            botReply("Got it! What’s the purpose of your appointment?");
            step++;
        } else if (step === 3) {
            userDetails.message = userMessage;
            botReply("Thanks! Booking your appointment now...");

            // Auto-submit to Contact Form
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://submit-form.com/osl2AVBaa";

            Object.keys(userDetails).forEach((key) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = userDetails[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            botReply("Your appointment request has been sent! ✅");
            step++;
        } else {
            botReply("If you need more help, just type!");
        }
    });
});
