import { useState } from "react";
import { Button, Col, Image, InputGroup, Form } from "react-bootstrap";
export default function ChatBox() {
    const [input, setUserInput] = useState("");
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "history-ai" }[]>([]);
    const [image, setShowImage] = useState(true);

    function sendButton() {
        if (input.trim() === "") return;
        const userMessage = { text: input, sender: "user" as "user" }
        setShowImage(false)
        const thinkingMessage = { text: "Thinking", sender: "history-ai" as "history-ai" }
        setMessages((prev) => [...prev, userMessage, thinkingMessage])
        setUserInput("");

        setTimeout(() => {
            setMessages((prev) => {
                const updated = [...prev];
                updated.pop();
                updated.push({ text: "Thank you for message", sender: "history-ai" })
                return updated;
            });
        }, 3000);


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
                            justifyContent: msg.sender === "user" ? "flex-start":"",
                            marginBottom: "10px",
                            alignItems: "center"
                        }}
                    >

                        <Image src={msg.sender === "user" ? "user.png" : "botev.png"} roundedCircle style={{ width: "35px", height: "35px" }} />

                        <div style={{maxWidth:"60%"}}>
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