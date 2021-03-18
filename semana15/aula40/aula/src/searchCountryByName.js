const countries = require("./countries")
const countryName = process.argv[2]

const searchResult = countries.filter((country)=>{
    return country.name.toLowerCase().includes(countryName.toLowerCase())
})

console.table(searchResult)
