import app from './app'
import createUser from './endpoints/createUser'
import getAddress from './services/getAddress'

app.post("/users/signup", createUser)
// getAddress("01257000").then(console.log)