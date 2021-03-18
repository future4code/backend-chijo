import styled from "styled-components"

export const HomeScreenContainer = styled.div`
    max-width: 600px;
    margin: 40px 20px 20px 20px;
    align-items: center;
    justify-content: center;
`

export const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    max-width: 220px;
    padding: 20px;
    margin: 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #e1edf0;
`

export const FormsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const FormComponent = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    max-width: 220px;
    padding: 20px;
    margin: 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #e1edf0;
`