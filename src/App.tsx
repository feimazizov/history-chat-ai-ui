import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css' 
import { Button, Container, Row, Col, Form, InputGroup, Image } from 'react-bootstrap';

function App() {
    const [input, setUserInput]=useState("")
  return (
    
      <Container  fluid>
        <Row style={{minHeight:"100vh", margin:0 }} >
          
        <Col sm={3} style={{borderRightStyle:"solid", alignItems:"center"} }>
        <Button style={{ margin:"10px 0px",width:"100%" }} >Викторина</Button>
        <Button style={{backgroundColor:'orange', width:"100%" }}>Изплюй интересен исторически факт</Button>
        <h3 style={{textAlign:'left', paddingTop:10}}>Разговори</h3>
        </Col>
        
        <Col sm={9} style={{justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column', height:'100vh'}}>
        <div style={{textAlign:'center', width:'80%'}}>
        <Image src="\public\botev.png" width="50%"  />
        <InputGroup className="mb-3">
        <Form.Control 
          rows={4}
          cols={100}
          as="textarea" 
          value={input}
          onChange={(e)=>setUserInput(e.target.value)}
          placeholder='Здравей, аз съм Христо Ботев. Готов ли си да научиш за борбата за свободата?'
          
        />
        <Button variant="primary"  onClick={() => console.log(input)}>
          Изпрати
        </Button>
      </InputGroup>
        </div>
        </Col>
        
        </Row>
        
       </Container>
    
  )
}

export default App
