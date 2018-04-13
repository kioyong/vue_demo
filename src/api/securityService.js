import axios from 'axios'
import {SECURITY_URL} from '../domain'
export const login = params => {
    return axios.post(SECURITY_URL+'/oauth/token', params, { "Content-Type": "multipart/form-data" })
}