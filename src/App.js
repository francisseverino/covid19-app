import React, { Component } from 'react';
import './App.css';
import API from './config/Api';
import { Row, Col, Button, Modal, Table, Figure, FormControl } from 'react-bootstrap';

const api = new API();

class Counter extends Component {
  state = {
    global: {},
    byCountry: [],
    filteredCountries: [],
    byStates: [],
    filteredStates: [],
    showByCountry: false,
    showByStates: false,
  };

  componentDidMount() {
    //Populate all the needed data to the state
    api.getGlobalTotals().then(response => {
      this.setState({
        global: response,
      });
    });
    api.getCountries().then(response => {
      this.setState({
        byCountry: response,
        filteredCountries: response,
      });
    });
    api.getStates().then(response => {
      this.setState({
        byStates: response,
        filteredStates: response,
      });
    });
  }

  //Modals Togglers
  closeByCountry = () => {
    this.setState({
      showByCountry: false,
    });
  };

  showByCountry = () => {
    this.setState({
      showByCountry: true,
    });
  };

  closeByStates = () => {
    this.setState({
      showByStates: false,
    });
  };

  showByStates = () => {
    this.setState({
      showByStates: true,
    });
  };

  formatNumber = value => {
    //i.e. 1324 -> 1,324
    return value && value.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
  };

  render() {
    const { global } = this.state;
    return (
      <div className='bgimg'>
        <div className='bg-layout'>
          <div className='middle'>
            <div className='content'>
              <h2 className='mb-5 font-weight-light'>COVID-19 CORONAVIRUS PANDEMIC</h2>
              <br />
              <Row className='show-grid content-space' float='center'>
                <Col>
                  <h1 className='global-cases-total text-info font-weight-lighter'>
                    {this.formatNumber(global.cases)}
                  </h1>
                  <h2 className='font-weight-light'>Coronavirus Cases</h2>
                </Col>

                <Col>
                  <h1 className='global-cases-total text-danger font-weight-lighter'>
                    {this.formatNumber(global.deaths)}
                  </h1>
                  <h2 className='font-weight-light'>Deaths</h2>
                </Col>

                <Col>
                  <h1 className='global-cases-total text-success font-weight-lighter'>
                    {this.formatNumber(global.recovered)}
                  </h1>
                  <h2 className='font-weight-light'>Recovered</h2>
                </Col>

                <Col>
                  <h1 className='global-cases-total text-warning font-weight-lighter'>
                    {this.formatNumber(global.active)}
                  </h1>
                  <h2 className='font-weight-light'>Active Cases</h2>
                </Col>
              </Row>
              <Button className=' m-5' variant='outline-light' size='lg' onClick={this.showByCountry}>
                View by Country
              </Button>
              <Button className='m-5' variant='outline-light' size='lg' onClick={this.showByStates}>
                View by USA States
              </Button>
            </div>
          </div>
          <div className='bottomleft'></div>
        </div>
        {this.StatesModal()}
        {this.CountryModal()}
      </div>
    );
  }

  _filterState = (query, data) => {
    if (!query || (query && !query.trim())) {
      return data;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(value => value.state.search(regex) >= 0);
  };

  handleStateChange = event => {
    const filtered = this._filterState(event.target.value, this.state.byStates);
    this.setState({
      filteredStates: filtered,
      stateQuery: event.target.value,
    });
  };

  StatesModal = () => {
    const { showByStates, stateQuery, filteredStates } = this.state;
    return (
      <>
        <Modal show={showByStates} onHide={this.closeByStates} scrollable={true} size='lg' centered>
          <Modal.Header closeButton className='bg-dark border-0'>
            <div class='col-sm-3'>
              <FormControl
                type='text'
                placeholder='Search By State'
                className='mr-sm-2'
                value={stateQuery}
                onChange={this.handleStateChange}
              />
            </div>
            <Modal.Title className='text-light'>Cases By State in the USA</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-dark'>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Total Cases</th>
                  <th>New Cases</th>
                  <th>Total Deaths</th>
                  <th>New Deaths</th>
                  <th>Active Cases</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map(state => (
                  <tr>
                    <td>{state.state}</td>
                    <td>{this.formatNumber(state.cases)}</td>
                    <td>{this.formatNumber(state.todayCases)}</td>
                    <td>{this.formatNumber(state.deaths)}</td>
                    <td>{this.formatNumber(state.todayDeaths)}</td>
                    <td>{this.formatNumber(state.active)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  handleCountryChange = event => {
    const filtered = this._filterCountry(event.target.value, this.state.byCountry);
    this.setState({
      filteredCountries: filtered,
      countryQuery: event.target.value,
    });
  };

  _filterCountry = (query, data) => {
    if (!query || (query && !query.trim())) {
      return data;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(value => value.country.search(regex) >= 0);
  };

  CountryModal = () => {
    const { showByCountry, countryQuery, filteredCountries } = this.state;

    return (
      <>
        <Modal show={showByCountry} onHide={this.closeByCountry} scrollable={true} size='xl' centered>
          <Modal.Header closeButton className='bg-dark border-0'>
            <div class='col-sm-3'>
              <FormControl
                type='text'
                placeholder='Search By Country'
                className='mr-sm-2'
                value={countryQuery}
                onChange={this.handleCountryChange}
              />
            </div>
            <Modal.Title className='text-light'>Cases By Country</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-dark'>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th></th>
                  <th>Country</th>
                  <th>Total Cases</th>
                  <th>New Cases</th>
                  <th>Total Deaths</th>
                  <th>New Deaths</th>
                  <th>Total Recovered</th>
                  <th>Active Cases</th>
                  <th>Serious, Critical</th>
                  <th>Cases Per One Million</th>
                  <th>Deaths Per One Million</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map(country => (
                  <tr>
                    <td>{<Figure.Image width={70} src={country.countryInfo.flag} />}</td>
                    <td>{country.country}</td>
                    <td>{this.formatNumber(country.cases)}</td>
                    <td>{this.formatNumber(country.todayCases)}</td>
                    <td>{this.formatNumber(country.deaths)}</td>
                    <td>{this.formatNumber(country.todayDeaths)}</td>
                    <td>{this.formatNumber(country.recovered)}</td>
                    <td>{this.formatNumber(country.active)}</td>
                    <td>{this.formatNumber(country.critical)}</td>
                    <td>{this.formatNumber(country.casesPerOneMillion)}</td>
                    <td>{this.formatNumber(country.deathsPerOneMillion)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  };
}

export default Counter;
