import { useState } from "react";
import { Button, Col, Image, InputGroup, Form } from "react-bootstrap";
export default function ChatBox() {
    const [input, setUserInput] = useState("")
    const [image, setShowImage] = useState(true)
    return (

        <Col sm={9} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height:"100%" }}>

            <div style={{ textAlign: 'center', width: '80%' }}>
                <div style={{ minHeight: "200px" }}>
                    {image &&
                        <Image src="\public\botev.png" width="50%" />
                        
                    }
                    
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
                    <Button variant="primary" onClick={() => { console.log(input); setShowImage(false); }} >
                        Изпрати
                    </Button>
                </InputGroup>
            </div>
        </Col >
    )
}