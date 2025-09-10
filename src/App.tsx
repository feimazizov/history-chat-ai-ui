import { useState, useEffect } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatBox from "./ChatBox";
import { Modal, Image } from "react-bootstrap";

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

export interface Conversation {
  id: number;
  messages: Message[];
  hero?: Hero;
}

export default function ChatPage() {
  const heroes: Hero[] = [
    { name: "Христо Ботев", img: "botev.png", key: "botev" },
    { name: "Васил Левски", img: "levski.png", key: "levski" },
    { name: "Хан Аспарух", img: "asparuh.png", key: "asparuh" },
  ];

  useEffect(() => {
    if (conversations.length === 0) {
      const newId = Date.now();
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

      setConversations([{ id: newId, messages: [], hero: randomHero }]);
      setActiveConversationId(newId);
    }
  }, []);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);

  function addConversation() {
    const newId = Date.now();
    setConversations(prev => [...prev, { id: newId, messages: [], hero: undefined }]);
    setActiveConversationId(newId);
    setShowHeroModal(true);
  }

  function updateMessages(convId: number, updater: (prev: Message[]) => Message[]) {
    setConversations(prev =>
      prev.map(c =>
        c.id === convId ? { ...c, messages: updater(c.messages) } : c
      )
    );
  }

  function selectHeroForConversation(hero: Hero) {
    setConversations(prev =>
      prev.map(c =>
        c.id === activeConversationId ? { ...c, hero } : c
      )
    );
    setShowHeroModal(false);
  }

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatSideBar
        conversations={conversations}
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
        addConversation={addConversation}
      />

      {activeConversation && activeConversation.hero && (
        <ChatBox
          conversationId={activeConversation.id}
          messages={activeConversation.messages}
          setMessages={msgs => updateMessages(activeConversation.id, msgs)}
          selectedHero={activeConversation.hero}
        />
      )}

      <Modal show={showHeroModal} onHide={() => setShowHeroModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Избери герой за този чат</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          {heroes.map(hero => (
            <div
              key={hero.key}
              style={{
                cursor: "pointer",
                border: activeConversation?.hero?.key === hero.key ? "3px solid #0d6efd" : "1px solid #ccc",
                borderRadius: "12px",
                padding: "8px",
                textAlign: "center",
                width: "80px",
                transition: "all 0.2s",
              }}
              onClick={() => selectHeroForConversation(hero)}
            >
              <Image src={hero.img} roundedCircle style={{ width: "50px", height: "50px" }} />
              <div style={{ fontSize: "13px", marginTop: "5px", fontWeight: 500 }}>{hero.name}</div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
