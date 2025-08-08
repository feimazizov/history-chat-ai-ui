import { Button, Col } from "react-bootstrap";
export default function ChatSideBar(){
    return(
    <div>
        <Button style={{ margin:"10px 0px",width:"100%" }} >Викторина</Button>
        <Button style={{backgroundColor:'orange', width:"100%" }}>Изплюй интересен исторически факт</Button>
        <h3 style={{textAlign:'left', paddingTop:10}}>Разговори</h3>
    </div>
    )
}