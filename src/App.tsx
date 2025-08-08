import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Button, Container, Row, Col, Form, InputGroup, Image } from 'react-bootstrap';
import ChatSideBar from './ChatSideBar';
import ChatBox from './ChatBox';
function App() {

  return (

    <Container fluid style={{ height: "100vh" }}>
      
      <Row style={{ height: "100%", margin: 0 }} >
        <Col sm={3} style={{ borderRightStyle: "solid", alignItems: "center", height: "100%" }}>
          <ChatSideBar></ChatSideBar>
        </Col>
        <Col sm={9} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height: "100%" }}>
          <ChatBox></ChatBox>
        </Col>
      </Row>

    </Container>

  )
}

export default App
