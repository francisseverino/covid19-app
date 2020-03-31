// Documentation for API https://docs.corona.lmao-xd.wtf/
export default class CarAPI {
  getGlobalTotals = () => {
    return fetch("https://corona.lmao.ninja/all")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
  getCountries = () => {
    return fetch("https://corona.lmao.ninja/countries")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
  getStates = () => {
    return fetch("https://corona.lmao.ninja/states")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      });
  };
}
