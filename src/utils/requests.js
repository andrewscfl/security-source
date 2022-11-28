import axios from 'axios'
export default class {
    static token = null
    static baseUrl = null
    constructor(){
        this.axios = axios
        this.baseUrl = /* 'http://localhost:5000'  */'https://api.securitysource.io'
        this.token = localStorage.getItem('token')
        this.token ? this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token : this.axios.defaults.headers.common['Authorization'] = null
        this.get =  this.axios.get
        this.post = this.axios.post
        this.put = this.axios.put
        this.del = this.axios.delete
        this.axios.defaults.baseURL = this.baseUrl
    }

    setToken(token){
        localStorage.setItem('token',token)
        this.token = token
    }
    static logout(){
        window.dispatchEvent(new CustomEvent('logout'))
    }
}


