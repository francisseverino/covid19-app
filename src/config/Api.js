// Documentation for API https://corona.lmao.ninja/docs/
export default class CarAPI {
  getGlobalTotals = () => {
    return fetch('https://corona.lmao.ninja/v2/all')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
  getCountries = () => {
    return fetch('https://corona.lmao.ninja/v2/countries')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
  getStates = () => {
    return fetch('https://corona.lmao.ninja/v2/states')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
}
