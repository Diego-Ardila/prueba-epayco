import React, { useState } from 'react';
import {Button, Container, Card, Row, Image, Col } from 'react-bootstrap';
import ConfirmationForm from '../components/ConfirmationForm';
import PurchaseForm from '../components/PurchaseForm';

//Componente que Maneja tanto la creacion de una compra como su confirmacion
function Purchase(){
    //Estados que se encargaran de condicionar el renderizado de los formularios, segun el que se elija
    const [purchase, setPurchase] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    return(
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <Card className="bg-dark mt-5 mb-5 p-3">
                        <Card.Title className="text-center">
                            <Image src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png" />
                            <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",color:"GrayText"}}>Wallet</h3>
                        </Card.Title>
                        <Row className="justify-content-center">
                            <Button className="col-lg-5 m-3" variant="outline-warning" onClick={()=>{ setPurchase(true); setConfirmation(false)}}>Inscribir Compra</Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="col-lg-5 m-3" variant="outline-warning" onClick={()=>{ setConfirmation(true); setPurchase(false)}}>Confirmar Compra</Button>
                        </Row>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    {!purchase && !confirmation && <Card className="text-center mt-5">
                                                <Card.Img variant="top" src="https://res.cloudinary.com/sharedbox/image/upload/v1606443745/Parking%20Alarcon/pagos-linea_ys6g0y.jpg" />
                                            </Card>}
                    {/*Renderizado Condicional que permite Escoger cual Formulario se Renderiza segun el Boton que se pulsa*/}
                    {purchase && <PurchaseForm setConfirmation={setConfirmation} setPurchase={setPurchase}/>}
                    {confirmation && <ConfirmationForm setConfirmation={setConfirmation} />}
                </Col>
            </Row>
    </Container>
    )
}

export default Purchase;