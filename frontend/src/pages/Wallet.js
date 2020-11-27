import React, { useState } from 'react';
import {Button, Container, Card, Row, Image, Col } from 'react-bootstrap';
import RechargeForm from '../components/RechargeForm';
import SaldoForm from '../components/SaldoForm';

function Wallet(){
    //Estados que se encargaran de condicionar el renderizado de los formularios, segun el que se elija
    const [recharge, setRecharge] = useState(false)
    const [saldo, setSaldo] = useState(false)
    return(
        <Container className="text-center mt-4 p-3">
            <Row>
                <Col sm={12} md={6}>
                    <Image src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png" />
                    <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",color:"GrayText"}}>Wallet</h3>
                    <Card className="bg-dark mt-2 p-3">
                        <Row className="justify-content-center">
                            <Button className="col-lg-5 m-3" variant="outline-warning" onClick={()=>{ setRecharge(true); setSaldo(false)}}>Recargar Billetera</Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="col-lg-5 m-3" variant="outline-warning" onClick={()=>{ setSaldo(true); setRecharge(false)}}>Consultar Saldo</Button>
                        </Row>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    {!recharge && !saldo && <Image style={{width:"30rem"}} src="https://res.cloudinary.com/sharedbox/image/upload/v1606440329/Parking%20Alarcon/wallet_zfonvd.jpg"/>}
                    {/*Renderizado Condicional que permite Escoger cual Formulario se Renderiza segun el Boton que se pulsa*/}
                    {recharge && <RechargeForm setRecharge={setRecharge}/>}
                    {saldo && <SaldoForm setSaldo={setSaldo} />}
                </Col>
            </Row>
    </Container>
    )
}

export default Wallet;