const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
    async purchaseConfirmation(token, user){
        try{
            let mail = {
                to: user.email,
                from: 'dardila90@hotmail.com',
                subject: `Confirmacion de transaccion de ${user.name} en Epayco Wallet`,
                text: `Gracias ${user.name} por escogernos, este codigo de confirmacion de tu compra = ${token}; 
                       Ingresalo en conjunto con el Id de la compra y sigue disfrutando nuestros servicios`,
                html:  `<img src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png"/>
                        <h4>Estas a punto de finalizar tu compra con Epayco Wallet</h4>
                        <p>
                            Aqui tienes tu codigo de confirmacion de tu compra =<em>${token}</em>; 
                            Ingresalo en conjunto con el Id de la compra que recibiste en la aplicacion
                            y sigue disfrutando nuestros servicios <br/> 
                        </p>`,
              }
              await sgMail.send(mail)
        }catch(err){
            console.dir(err)
            throw err
        }
    }
}