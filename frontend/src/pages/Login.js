import React,{ useState } from "react";
import * as Yup from "yup";
import { Container, Card, Form, Button, Col, Image, Spinner } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {login} from '../utils/httpRequests';
import swal from 'sweetalert';
import {Link, useHistory} from 'react-router-dom';

    //Variable que almacena url del logo
    const logo= "https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png"

    //validaciones del formulario por medio de Yup
    const formSchema = Yup.object().shape({
        email: Yup.string().required("campo requerido"),
        password: Yup.string().required("campo requerido")
    })

function Login() {
    const history = useHistory()
    //Destructuring de el objeto que nos proporciona la libreria react-hook-form para el manejo del formulario

    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
      });

    //Funcion que se encarga de recibir la data del formulario y enviarla a la base de datos para validar el login
    const onSubmit = async (data)=>{
        try{
        //Variable que se encarga de mostrar el estado de carga del envio del formulario
        isSubmitting = true
        const {token} = await login(data)
        //Guardar el token en el Almacenamiento del Navegador para permitir al usuario volver a ingresar sin registrarse nuevamente
        localStorage.setItem("token", token)
        history.push('/home')
        }catch(err){
            swal("Error",`${err.response.data}`,"error")
        }
      }
    return(
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} className="bg-dark justify-content-center mt-3 p-5">
                <Form.Row className="justify-content-center">
                    <Col sm={6} md={4} className="text-center">
                        <Image style= {{width: 130}} src={logo} alt="logo"></Image>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6" >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{color:"white"}} >Email</Form.Label>
                        <Form.Control name="email" ref={register} type="email" placeholder="Escriba su email" className={ errors.email ? "is-invalid" : null}/>
                        { errors.email && <div className="error-message">{errors.email.message}</div>}
                        <Form.Text className="text-muted">
                        Nunca compartiremos tu correo con nadie.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{color:"white"}}>Contraseña</Form.Label>
                        <Form.Control name="password" ref={register} type="password" placeholder="XXXXXX" className={ errors.password ? "is-invalid" : null} />
                        { errors.password && <div className="error-message">{errors.password.message}</div>}
                      </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                        {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        <Button disabled={isSubmitting} variant="outline-light" type="submit">
                         {!isSubmitting ? "Entrar" : "...Cargando"}
                        </Button>
                    </Col>
                </Form.Row>
                <Form.Row className="justify-content-center mt-2">
                    <Link style={{color:"yellow"}} to="/register">Crea una cuenta</Link>
                </Form.Row>
                </Form>
        </Container>
    )
}

export default Login;