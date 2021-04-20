let errorCode = 400

export const setErrorCode = (newVal: number) => errorCode = newVal

export const getErrorCode = () => { return errorCode }

export const hasParameter = (param: string, paramName: string): void => {
    if (!param) {
        setErrorCode(422)
        throw new Error(`Preencha ${paramName} corretamente!`)
    }
}

export const hasResult = (array: any[]): void => {
    if (array.length < 1) {
        setErrorCode(400)
        throw new Error(`Nenhum resultado encontrado!`)
    }
}

export const generateUUID = () => {
    var d = new Date().getTime()
    var d2 = 0
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16
        if (d > 0) {
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    });
}

export const dateToDB = (date: string): string => {
    let day = date.substr(0,2)
    let month = date.substr(3,2)
    let year = date.substr(6,4)
    return (year + "-" + month + "-" + day)
}

export const DBToDate = (dbDate: Date): string => {
    let year = dbDate.getUTCFullYear()
    let month = dbDate.getUTCMonth() + 1
    let day = dbDate.getUTCDate()

    let monthString = String(month)
    let dayString = String(day)
    if (Number(month) < 10) monthString = "0" + month
    if (Number(day) < 10) dayString = "0" + day

    return (dayString + "/" + monthString + "/" + year)
}