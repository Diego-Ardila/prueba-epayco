import axios from "axios";
//Listado donde se encuentran todas las peticiones HTTP por medio de la libreria axios

export const createUser= async (data) => {
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user",
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const login= async (data) => {
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user/login",
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const recharge= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"PUT",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const getWallet= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"GET",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:`/user?phoneNumber=${data.phoneNumber}&document=${data.document}`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const createPurchase= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:`/purchase`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const confirmation= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"PUT",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:`/purchase`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}