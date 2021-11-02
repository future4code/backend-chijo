import { address } from "../types"
import axios from 'axios'

const getAddress = async (cep: string): Promise<address | null> => {
    try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        return {
            logradouro: res.data.logradouro,
            cidade: res.data.localidade,
            bairro: res.data.bairro,
            estado: res.data.uf
        }

    } catch (err) {
        console.log(err.response)
        return null
    }
}

export default getAddress