import { useState, useRef, useEffect } from "react";
import { Button, Image, InputGroup, Form } from "react-bootstrap";
import axios from "axios";

interface Message {
    id: number;
    text: string;
    sender: "user" | "history-ai";
}

interface Hero {
    name: string;
    img: string;
    key: string;
}

interface ChatBoxProps {
    conversationId: number;
    messages: Message[];
    setMessages: (updater: (prev: Message[]) => Message[]) => void;
    selectedHero: Hero;
}

export default function ChatBox({
    conversationId,
    messages,
    setMessages,
    selectedHero,
}: ChatBoxProps) {
    const [input, setUserInput] = useState<string>("");
    const [showImage, setShowImage] = useState<boolean>(true);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    async function sendButton() {
        if (input.trim() === "") return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: "user",
        };

        const thinkingMessage: Message = {
            id: Date.now() + 1,
            text: "Мисля...",
            sender: "history-ai",
        };

        setMessages(prev => [...prev, userMessage, thinkingMessage]);
        setUserInput("");
        setShowImage(false);

        try {
            const res = await axios.post<{ reply: string }>("/api/ai/sendMessage", {
                message: input,
                hero: selectedHero.key,
            });

            const reply = res.data.reply;

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === thinkingMessage.id ? { ...msg, text: reply } : msg
                )
            );
        } catch (err) {
            console.error(err);

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === thinkingMessage.id
                        ? { ...msg, text: "⚠️ Грешка при свързване със сървъра." }
                        : msg
                )
            );
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                height: "100%",
                padding: "20px",
                boxSizing: "border-box",
                background: "#f5f5f5",
                overflow: "hidden",
            }}
        >

            <div
                ref={chatRef}
                style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "20px",
                    borderRadius: "12px",
                    background: "#fff",
                    marginBottom: "15px",
                }}
            >
                {messages.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#555" }}>
                        <Image
                            src={selectedHero.img}
                            style={{
                                width: "150px",
                                height: "auto",
                                marginBottom: "15px",
                            }}
                        />
                        <p style={{ fontSize: "18px" }}>
                            Здравей, аз съм {selectedHero.name}. Готов ли си да научиш за
                            историята?
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: "flex",
                                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                                alignItems: "flex-end",
                                gap: "10px",
                                width: "100%",
                            }}
                        >
                            <Image
                                src={msg.sender === "user" ? "user.png" : selectedHero.img}
                                roundedCircle
                                style={{ width: "40px", height: "40px", flexShrink: 0 }}
                            />
                            <div
                                style={{
                                    maxWidth: "70%",
                                    minWidth: "50px",
                                    background:
                                        msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                                    padding: "10px 14px",
                                    borderRadius: "18px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                    fontSize: "15px",
                                    lineHeight: "1.4",
                                    wordBreak: "break-word",
                                    flexShrink: 0,
                                    alignSelf:
                                        msg.sender === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Hero image at bottom */}
            {messages.length > 0 && showImage && (
                <div
                    style={{
                        maxHeight: "180px",
                        width: "100%",
                        overflow: "hidden",
                        marginBottom: "10px",
                    }}
                >
                    <Image
                        src={selectedHero.img}
                        style={{
                            height: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            margin: "0 auto",
                        }}
                    />
                </div>
            )}

            {/* Input area */}
            <InputGroup style={{ gap: "10px" }}>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={input}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={`Напиши съобщение за ${selectedHero.name}...`}
                    style={{
                        fontSize: "16px",
                        borderRadius: "12px",
                        resize: "none",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendButton();
                        }
                    }}
                />
                <Button
                    variant="primary"
                    onClick={sendButton}
                    style={{ minWidth: "120px", borderRadius: "12px" }}
                >
                    Изпрати
                </Button>
            </InputGroup>
        </div>
    );
}
