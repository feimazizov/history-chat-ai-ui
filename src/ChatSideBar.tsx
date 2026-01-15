import { Button } from "react-bootstrap";
import type { Conversation } from "./App";

interface ChatSideBarProps {
    conversations: Conversation[];
    activeConversationId: number | null;
    setActiveConversationId: (id: number) => void;
    addConversation: () => void;
    onOpenQuiz: () => void;
}

export default function ChatSideBar({
    conversations,
    activeConversationId,
    setActiveConversationId,
    addConversation,
    onOpenQuiz,
}: ChatSideBarProps) {
    return (
        <div className="d-flex flex-column min-vh-100 p-3">
            <Button className="mb-2 w-100" onClick={onOpenQuiz}>Викторина</Button>
            <Button variant="warning" className="mb-3 w-100">
                Исторически факт
            </Button>

            <h5 className="mb-3">Разговори</h5>
            <Button variant="success" className="mb-3 w-100" onClick={addConversation}>
                Нов чат
            </Button>

            <div className="overflow-auto flex-grow-1">
                {conversations.length === 0 ? (
                    <div className="text-muted fst-italic">Няма създадени разговори.</div>
                ) : (
                    conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`p-2 mb-2 rounded border ${conv.id === activeConversationId ? "border-primary bg-light" : ""
                                }`}
                            style={{ cursor: "pointer" }}
                        >
                            {conv.hero ? conv.hero.name : "Нов чат"}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
