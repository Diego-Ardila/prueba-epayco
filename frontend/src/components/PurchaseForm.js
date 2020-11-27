import React from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {createPurchase} from '../utils/httpRequests';
import swal from 'sweetalert';

//Configuracion de Yup, libreria encargada de ejecutar las validaciones del formulario
const formSchema = Yup.object().shape({   
    value: Yup.number().required("Campo Requerido").typeError('Debes ingresar solo numeros'),
})


function PurchaseForm({setPurchase, setConfirmation}) {

    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
    });

    //Funcion onSubmit encargada de recoger la data del formulario y mandarla a la base de datos mediante una peticion HTTP
      const onSubmit= async (data)=>{
          try{
            //Variable que se encarga de mostrar el estado de carga del envio del formulario
            isSubmitting = true
            const purchase = await createPurchase(data)
            swal(`Tramite en proceso, Porfavor copia este Id = ${purchase._id}`,`Ahora el ultimo paso a seguir es validar tu compra, ingresando el Id que acabas de copiar, y el token que acabamos de enviar a tu correo `,"warning")
            isSubmitting = false
            //Para dejar de Renderizar el formulario y abrir el de confirmacion
            setPurchase(false)
            setConfirmation(true)
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
                        <Form.Label  style={{color: "white"}}>Valor de Compra</Form.Label>
                        <Form.Control ref={register} name="value" type="number" placeholder="Ingresa el monto a pagar"  className={ errors.value ? "is-invalid" : null}  />
                        { errors.value && <div style={{color:"white"}} className="error-message">{errors.value.message}</div>}
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

export default PurchaseForm;