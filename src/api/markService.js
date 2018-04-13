import axios from 'axios'
import {MARK_URL} from '../domain'

export const getHello = params => {
    return axios.get(MARK_URL + "/hello" + params)
}