import React from "react";
import {useHistory} from 'react-router-dom';
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {getWallet} from '../utils/httpRequests';
import swal from 'sweetalert';

//Configuracion de Yup, libreria encargada de ejecutar las validaciones del formulario
const formSchema = Yup.object().shape({
    document: Yup.number().required("Campo Requerido").typeError('Debes ingresar solo numeros'),
    phoneNumber: Yup.number().required("Campo Requerido").typeError('Debes ingresar solo numeros').test('len', 'Debes ingresar al menos 10 numeros', val => val && val.toString().length >= 10 ),
})


function SaldoForm({setSaldo}) {
    const history = useHistory()
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
    });

    //Funcion onSubmit encargada de recoger la data del formulario y mandarla a la base de datos mediante una peticion HTTP
      const onSubmit= async (data)=>{
          try{
            //Variable que se encarga de mostrar el estado de carga del envio del formulario
            isSubmitting = true
            const wallet = await getWallet(data)
            swal(`Tu saldo es = $${wallet} `,"Has pasado la Verificacion de tus datos ","success")
            isSubmitting = false
            //Para dejar de Renderizar el formulario
            setSaldo(false)
          }catch(err){
              swal("Error",`${err.response.data}`,"error")
              isSubmitting = false
          }
      }
      
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 mb-5 ">
                <Col className="bg-dark p-3">
                <Form onSubmit={handleSubmit(onSubmit)}  noValidate>
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Documento de Identidad</Form.Label>
                        <Form.Control ref={register} name="document" type="number" placeholder="Ingresa tu Numero de Documento de identidad" className={ errors.document ? "is-invalid" : null}  />
                        { errors.document && <div style={{color:"white"}} className="error-message">{errors.document.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Numero Celular</Form.Label>
                        <Form.Control ref={register} name="phoneNumber" type="tel" placeholder="Ingresa tu Numero Celular" className={ errors.phoneNumber ? "is-invalid" : null}  />
                        { errors.phoneNumber && <div style={{color:"white"}} className="error-message">{errors.phoneNumber.message}</div>}
                    </Form.Group> 
                    <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                    {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        <Button variant="outline-light" disabled={isSubmitting} className="mt-3" type="submit">
                         {!isSubmitting ? "Enviar" : "...Cargando"}
                        </Button>
                    </Col>
                </Form.Row>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default SaldoForm;