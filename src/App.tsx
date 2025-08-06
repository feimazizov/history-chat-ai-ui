import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Button, Container, Row, Col, Form, InputGroup, Image } from 'react-bootstrap';
import ChatSideBar from './ChatSideBar';
import ChatBox from './ChatBox';
function App() {

  return (

    <Container fluid style={{height:"100vh"}}>
      <Row style={{ height:"100%", margin: 0 }} >

        <ChatSideBar></ChatSideBar>

        <ChatBox></ChatBox>

      </Row>

    </Container>

  )
}

export default App
