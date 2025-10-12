import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

interface QuizModalProps {
    show: boolean;
    onHide: () => void;
    heroKey?: string | null;
}

export default function QuizModal({ show, onHide, heroKey }: QuizModalProps) {
    const [quiz, setQuiz] = useState<any>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setLoading(true);
            setQuiz(null);
            setSubmitted(false);
            setSelected(null);

            axios
                .post("/ai/generateQuiz", { hero: heroKey })
                .then((res) => {
                    setQuiz(res.data.quiz);
                })
                .catch(() => {
                    setQuiz({
                        question: "Грешка при зареждане на въпроса.",
                        answers: [],
                        correct: "",
                    });
                })
                .finally(() => setLoading(false));
        }
    }, [show, heroKey]);

    if (loading)
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Body className="text-center py-5">
                    <Spinner animation="border" /> <div>Зареждам въпрос...</div>
                </Modal.Body>
            </Modal>
        );

    if (!quiz) return null;

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>🎓 Историческа Викторина</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="mb-3">{quiz.question}</h5>
                {quiz.answers.map((a: string) => (
                    <Form.Check
                        key={a}
                        type="radio"
                        label={a}
                        name="quiz"
                        disabled={submitted}
                        checked={selected === a}
                        onChange={() => setSelected(a)}
                    />
                ))}

                {submitted && (
                    <div className="mt-3">
                        {selected === quiz.correct ? (
                            <div className="text-success fw-bold">✅ Вярно!</div>
                        ) : (
                            <div className="text-danger fw-bold">
                                ❌ Грешно. Верният отговор е: {quiz.correct}
                            </div>
                        )}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!submitted ? (
                    <Button onClick={() => setSubmitted(true)} disabled={!selected}>
                        Провери
                    </Button>
                ) : (
                    <Button variant="secondary" onClick={onHide}>
                        Затвори
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
