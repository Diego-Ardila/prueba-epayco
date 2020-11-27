import React from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {confirmation} from '../utils/httpRequests';
import swal from 'sweetalert';

//Configuracion de Yup, libreria encargada de ejecutar las validaciones del formulario
const formSchema = Yup.object().shape({   
    purchaseId: Yup.string().required("Campo Requerido"),
    token: Yup.number().required("Campo Requerido").typeError('Debes ingresar solo numeros').test('len', 'El token debe contener 6 numeros', val => val && val.toString().length === 6 ),
})


function ConfirmationForm({setConfirmation}) {
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
    });

    //Funcion onSubmit encargada de recoger la data del formulario y mandarla a la base de datos mediante una peticion HTTP
      const onSubmit= async (data)=>{
          try{
            //Variable que se encarga de mostrar el estado de carga del envio del formulario
            isSubmitting = true
            const msje = await confirmation(data)
            swal("Tramite Satisfactorio",`${msje} `,"success")
            isSubmitting = false
            //Para dejar de Renderizar el formulario
            setConfirmation(false)
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
                        <Form.Label  style={{color: "white"}}>Id de Compra</Form.Label>
                        <Form.Control ref={register} name="purchaseId" type="text" placeholder="Ingresa el Id que te fue suministrado al crear la compra" className={ errors.purchaseId ? "is-invalid" : null}  />
                        { errors.purchaseId && <div style={{color:"white"}} className="error-message">{errors.purchaseId.message}</div>}
                    </Form.Group> 
                    <Form.Group >
                        <Form.Label  style={{color: "white"}}>Token</Form.Label>
                        <Form.Control ref={register} name="token" type="number" placeholder="Ingresa el Token que te enviamos por correo" className={ errors.token ? "is-invalid" : null}  />
                        { errors.token && <div style={{color:"white"}} className="error-message">{errors.token.message}</div>}
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

export default ConfirmationForm;