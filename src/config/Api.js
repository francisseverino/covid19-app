// Documentation for API https://corona.lmao.ninja/docs/

const request = (endpoint) => 
  fetch(`https://corona.lmao.ninja/v2/${endpoint}`)
    .then(response => response.json())
export default class CarAPI {
  getGlobalTotals = () => request('all')

  getCountries = () => request('countries')

  getStates = () => request('states')

}
