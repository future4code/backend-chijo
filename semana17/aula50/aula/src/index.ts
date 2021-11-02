import app from "./app"
import createUser from './endpoints/createUser'
import { getAddressInfo } from './services/getAddressInfo'

app.post('/users/signup', createUser)

getAddressInfo("01257000").then(console.log)