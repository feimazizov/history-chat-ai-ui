import { Button, Col } from "react-bootstrap";
export default function ChatSideBar(){
    return(
    <Col sm={3} style={{borderRightStyle:"solid", alignItems:"center", height:"100%"} }>
        <Button style={{ margin:"10px 0px",width:"100%" }} >Викторина</Button>
        <Button style={{backgroundColor:'orange', width:"100%" }}>Изплюй интересен исторически факт</Button>
        <h3 style={{textAlign:'left', paddingTop:10}}>Разговори</h3>
    </Col>
    )
}