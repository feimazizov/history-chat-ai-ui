import { useState, useEffect } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatBox from "./ChatBox";
import QuizModal from "./QuizModal";
import { Modal, Image, Container, Row, Col } from "react-bootstrap";


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

export default function App() {
  const heroes: Hero[] = [
    { name: "Христо Ботев", img: "botev.png", key: "botev" },
    { name: "Васил Левски", img: "levski.png", key: "levski" },
    { name: "Хан Аспарух", img: "asparuh.png", key: "asparuh" },
  ];

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);

  useEffect(() => {
    if (conversations.length === 0) {
      const newId = Date.now();
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
      setConversations([{ id: newId, messages: [], hero: randomHero }]);
      setActiveConversationId(newId);
    }
  }, []);

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

  const [showQuizModal, setShowQuizModal] = useState(false);

  return (
    <Container fluid style={{ height: "100vh" }} className="p-0">
      <Row className="h-100 g-0">
        <Col style={{ width: "280px", flex: "0 0 280px" }} className="border-end p-0">
          <ChatSideBar
            conversations={conversations}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
            addConversation={addConversation}
            onOpenQuiz={() => setShowQuizModal(true)}
          />
        </Col>
        <Col className="p-0 d-flex flex-column h-100">
          <ChatBox
            conversationId={activeConversation?.id ?? -1}
            messages={activeConversation?.messages ?? []}
            setMessages={
              activeConversation
                ? updater => updateMessages(activeConversation.id, updater)
                : () => { }
            }
            selectedHero={activeConversation?.hero ?? null}
          />
        </Col>
      </Row>

      <QuizModal show={showQuizModal} onHide={() => setShowQuizModal(false)} heroKey={activeConversation?.hero?.key} />

      <Modal show={showHeroModal} onHide={() => setShowHeroModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Избери герой за този чат</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center gap-3">
          {heroes.map(hero => (
            <div
              key={hero.key}
              className={`text-center p-2 rounded ${activeConversation?.hero?.key === hero.key ? "border-primary border-3" : "border"
                }`}
              style={{ cursor: "pointer", width: "80px" }}
              onClick={() => selectHeroForConversation(hero)}
            >
              <Image src={hero.img} roundedCircle width={50} height={50} />
              <div className="mt-2 fw-semibold" style={{ fontSize: "13px" }}>{hero.name}</div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
