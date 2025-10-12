import { useState, useRef, useEffect } from "react";
import { Button, Image, InputGroup, Form, Stack, Container } from "react-bootstrap";
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
    selectedHero: Hero | null;
}

export default function ChatBox({
    conversationId,
    messages,
    setMessages,
    selectedHero,
}: ChatBoxProps) {
    const [input, setUserInput] = useState("");
    const [showImage, setShowImage] = useState(true);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    async function sendButton() {
        if (!selectedHero || input.trim() === "") return;

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
        } catch {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === thinkingMessage.id
                        ? { ...msg, text: "⚠️ Грешка при свързване със сървъра." }
                        : msg
                )
            );
        }
    }

    if (!selectedHero) {
        return (
            <Container fluid className="d-flex flex-column h-100 p-3 bg-light text-center">
                <div className="my-auto text-muted">
                    <p className="fs-5">Избери герой, за да започнеш чат.</p>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="d-flex flex-column h-100 p-3">
            {messages.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                    <div className="w-100" style={{ maxWidth: "600px" }}>
                        <Image src={selectedHero.img} width={150} className="mb-3 mx-auto d-block" />

                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                style={{ height: "60px", resize: "none" }}
                                value={input}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder={`Напиши съобщение за ${selectedHero.name}...`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendButton();
                                    }
                                }}
                            />
                            <Button variant="primary" onClick={sendButton} className="rounded">
                                Изпрати
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        ref={chatRef}
                        className="overflow-auto bg-white rounded p-3 mb-3"
                        style={{ flex: 1, minHeight: 0 }}
                    >
                        <Stack gap={3}>
                            {messages.map((msg) => (
                                <Stack
                                    key={msg.id}
                                    direction="horizontal"
                                    className={`align-items-end ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                                    gap={2}
                                >
                                    <Image
                                        src={msg.sender === "user" ? "user.png" : selectedHero.img}
                                        roundedCircle
                                        width={40}
                                        height={40}
                                    />
                                    <div
                                        className={`p-2 rounded-4 shadow-sm ${msg.sender === "user"
                                            ? "bg-success-subtle align-self-end"
                                            : "bg-danger-subtle align-self-start"
                                            }`}
                                        style={{
                                            width: "100%",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </Stack>
                            ))}
                        </Stack>
                    </div>

                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            style={{ height: "60px", resize: "none" }}
                            value={input}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={`Напиши съобщение за ${selectedHero.name}...`}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendButton();
                                }
                            }}
                        />
                        <Button variant="primary" onClick={sendButton} className="rounded">
                            Изпрати
                        </Button>
                    </InputGroup>
                </>
            )}
        </Container>
    );
}
