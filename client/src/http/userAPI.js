import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, name, second_name, surname, p_number) => {
    const {data} = await $host.post('api/users/registration', {email, password, name, second_name, surname, p_number, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/users/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(data)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/users/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const changeWorker = async (email) => {
    const {data} = await $authHost.post('api/users/', {email})
    return data
}

export const changeAdmin = async (email) => {
    const {data} = await $authHost.post('api/users/admin', {email})
    return data
}

export const changeUser = async (email) => {
    const {data} = await $authHost.post('api/users/user', {email})
    return data
}

export const basketGet = async (userId) => {
    const {data} = await $authHost.post('api/basket/get', {userId})
    return data
}

export const basketAdd = async (userId, goodId) => {
    const {data} = await $authHost.post('api/basket/', {userId, goodId})
    return data
}