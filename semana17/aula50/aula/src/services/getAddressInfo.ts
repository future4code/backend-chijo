import axios from "axios"
import { addressInfo } from '../types'

export const getAddressInfo = async (zipCode: string): Promise<addressInfo | null> => {
    try {
        const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        return {
            street: res.data.logradouro,
            neighborhood: res.data.bairro,
            city: res.data.localidade,
            state: res.data.uf
        }
    } catch (err) {
        console.log(err)
        return null
    }
}