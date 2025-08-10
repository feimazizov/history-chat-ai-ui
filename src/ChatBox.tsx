import { useState } from "react";
import { Button, Col, Image, InputGroup, Form } from "react-bootstrap";
import OpenAI from "openai";
export default function ChatBox() {
    const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: import.meta.env.VITE_AI_SECRET,
    dangerouslyAllowBrowser: true
});
    const [input, setUserInput] = useState("");
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "history-ai" }[]>([]);
    const [image, setShowImage] = useState(true);

     async function sendButton() {
        if (input.trim() === "") return;
        const userMessage = { text: input, sender: "user" as "user" }
        setShowImage(false)
        const thinkingMessage = { text: "Thinking", sender: "history-ai" as "history-ai" }
        setMessages((prev) => [...prev, userMessage, thinkingMessage])
        setUserInput("");

         try {
      const res = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Ти си Христо Ботев и говориш като възрожденец." },
          { role: "user", content: input }
        ],
        temperature: 0.7
      });

        const reply = res.choices[0]?.message?.content ?? "Нямам отговор.";

         setTimeout(() => {
            setMessages((prev) => {
                const updated = [...prev];
                updated.pop();
                updated.push({ text: reply, sender: "history-ai" })
                return updated;
            });
        }, 3000);   

        

    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({ text: "Грешка при свързване с DeepSeek API", sender: "history-ai" });
        return updated;
      });
    }
}




    
    return (

        <div style={{ textAlign: 'center', width: '80%' }}>
            <div style={{ minHeight: "200px", maxHeight: "60vh" }}>
                {image &&
                    <Image src="\public\botev.png" width="50%" />
                }

            </div>
            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                {messages.map((msg, idx) => (
                    <div key={idx}
                        style={{
                            display: "flex",
                            flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                            justifyContent: msg.sender === "user" ? "flex-start" : "",
                            marginBottom: "10px",
                            alignItems: "center"
                        }}
                    >

                        <Image src={msg.sender === "user" ? "user.png" : "botev.png"} roundedCircle style={{ width: "35px", height: "35px" }} />

                        <div style={{ maxWidth: "60%" }}>
                            {msg.text}
                        </div>
                    </div>
                ))}

            </div>

            <InputGroup className="mb-3" style={{ alignContent: "center" }}>
                <Form.Control
                    rows={4}
                    cols={100}
                    as="textarea"
                    value={input}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='Здравей, аз съм Христо Ботев. Готов ли си да научиш за борбата за свободата?'
                />
                <Button variant="primary" onClick={sendButton} >
                    Изпрати
                </Button>
            </InputGroup>

        </div>

            )
    }
