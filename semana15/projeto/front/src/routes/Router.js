import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import AdminScreen from '../screens/AdminScreen/AdminScreen'
import UserScreen from '../screens/UserScreen/UserScreen'
import NewTransferScreen from '../screens/NewTransferScreen/NewTransferScreen'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/admin" component={AdminScreen} />
                <Route exact path="/user/:cpf" component={UserScreen} />
                <Route exact path="/user/:cpf/transfer" component={NewTransferScreen} />
                <Route>
                    <div>Erro 404 - Rota inválida</div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router