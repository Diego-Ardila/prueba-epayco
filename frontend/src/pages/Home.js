import React from 'react';
import {Button, Container, Card, Row, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Home(){
    const history = useHistory()
    return(
        <Container className="text-center mt-4 p-3">
            <Image src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png" />
            <Card className="mt-5 p-3">
                <Row className="justify-content-center">
                    <Button className=" bg-primary col-lg-5 m-3 " onClick={()=> history.push('/compras')}>Compras</Button>
                </Row>
                <Row className="justify-content-center">
                    <Button className="bg-primary col-lg-5 m-3" onClick={() => history.push('/wallet')}>Mi Billetera</Button>
                </Row>
                <Row className="justify-content-center">
                    <Button className="bg-primary col-lg-5 m-3" onClick={() => history.push('/logout')}>Cerrar Sesion</Button>
                </Row>
            </Card>
        </Container>
    )
}

export default Home;