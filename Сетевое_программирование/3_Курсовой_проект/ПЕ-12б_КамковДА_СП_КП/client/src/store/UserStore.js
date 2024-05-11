import {makeAutoObservable} from "mobx";

export class IUser {
    constructor(){
        this.id = ''
        this.email = ''
        this.role = ''
    }
}

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = new IUser()
        makeAutoObservable(this)
    }
    
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserRole(role) {
        this._user.role = role
    }
    setUserName(name) {
        this._user.name = name
    }
    setUserSecondName(second_name) {
        this._user.second_name = second_name
    }
    setUserSurname(surname) {
        this._user.surname = surname
    }
    setUserPNumber(p_namber) {
        this._user.p_namber = p_namber
    }
    setUserEmail(email) {
        this._user.email = email
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get userRole(){
        return this._user.role
    }

}