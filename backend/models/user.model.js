const { Schema , model, models } = require("mongoose")


//Esquema para la creacion de la coleccion de usuarios en la base de datos
const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
        //Trim para eliminar los posibles espacios en blanco con los que pudiera llegar el nombre de usuario
        trim: true
    },
    document:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        //Validacion que se encarga de asegurar que el email no exista aun en la base de datos
        validate: {
            async validator(email){
                try{
                  const user = await models.User.findOne({email})
                  return !user
                }catch(err){
                    return false
                }
            },
            message:"El E-mail ya existe"
        }
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
        trim: true
    }
},{
    timestamps: true
})



const User = new model("User", userSchema)

module.exports = User