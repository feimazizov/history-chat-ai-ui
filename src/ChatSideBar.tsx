import { Button } from "react-bootstrap";
import type { Conversation } from "./App";
interface ChatSideBarProps {
    conversations: Conversation[];
    activeConversationId: number | null;
    setActiveConversationId: (id: number) => void;
    addConversation: () => void;
}

export default function ChatSideBar({
    conversations,
    activeConversationId,
    setActiveConversationId,
    addConversation,
}: ChatSideBarProps) {
    return (
        <div
            style={{
                width: "250px",
                borderRight: "1px solid #ccc",
                padding: "10px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Button style={{ margin: "10px 0px", width: "100%" }}>Викторина</Button>
            <Button style={{ backgroundColor: "orange", width: "100%" }}>
                Изплюй интересен исторически факт
            </Button>

            <h3 style={{ textAlign: "left", paddingTop: 10 }}>Разговори</h3>

            <Button
                variant="success"
                style={{ width: "100%", marginBottom: "10px" }}
                onClick={addConversation}
            >
                Нов чат
            </Button>

            <div style={{ overflowY: "auto", flex: 1 }}>
                {conversations.length === 0 ? (
                    <div style={{ padding: "10px", color: "#666", fontStyle: "italic" }}>
                        Няма създадени разговори. Натисни „Нов чат“, за да започнеш.
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            style={{
                                padding: "8px",
                                margin: "5px 0",
                                cursor: "pointer",
                                border:
                                    conv.id === activeConversationId
                                        ? "2px solid blue"
                                        : "1px solid gray",
                                borderRadius: "6px",
                                textAlign: "left",
                                backgroundColor:
                                    conv.id === activeConversationId ? "#e7f1ff" : "transparent",
                            }}
                        >
                            {conv.hero ? conv.hero.name : "Нов чат"}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
