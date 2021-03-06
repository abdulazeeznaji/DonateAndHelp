// The is the home page of the beneficiary after logging in
import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import beneficiariesMessage from './Beneficiaries_Message.jsx'
import beneficiariesCampaign from './Beneficiaries_Campaign.jsx'
import beneficiariesProfile from './Beneficiaries_Profile.jsx'

function searching (term) {
  return function (x) {
    return x.campaignName.toLowerCase().includes(term.toLowerCase())
  }
}

class Beneficiaries extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      term: '',
      camp: []
    }
    this.search = this.search.bind(this)
    this.logout = this.logout.bind(this)
    this.submitCompany = this.submitCompany.bind(this)
  }

  submitCompany () {
    console.log('Done')
  }

  componentDidMount () { // Retrieve the donor campagins in the beneficiary home page when the home page is loaded
    var x = this
    axios.get('/donorCam')
      .then(function (res) {
        console.log(res.data)
        x.setState({camp: res.data})
      }).catch(function (err) {
        console.log(err)
      })
  }

  search (e) {
    this.setState({term: e.target.value})
  }

  logout () {
    axios.get('/logout')
      .then(function (res) {
        console.log('Logged out')
        window.location.href = '/'
      }).catch(function (err) {
        console.log('logout err ', err)
      })
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top navbar-defaul'>
          <a href='#' />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto' />
            <ul className='navbar-nav mr-auto nav '>
              <li><a href='/beneficiaries' to='/beneficiaries'>Home</a></li>
              <li><a href='/Beneficiaries_Campaign' to='/Beneficiaries_Campaign'>Fundraising</a></li>
            </ul>
            <form className='form-inline my-2 my-lg-0'>
              <Router>
                <ul className='nav navbar-nav navbar-right ' >
                  <li> <a href='/search' className='icon-bar' >Search</a> </li>
                  <li> <a href='/Beneficiaries_Message' className='icon-bar' to='/Beneficiaries_Message' replace >Message</a> </li>
                  <li> <a href='/Beneficiaries_Profile' className='icon-bar' to='/Beneficiaries_Profile'>Profile</a> </li>
                  <li> <a href='/' onClick={this.logout} className='icon-bar' to='/logout'>Logout</a> </li>
                  <li><a /></li>
                  <Route path='/Beneficiaries_Profile' component={beneficiariesProfile} />
                  <Route path='/Beneficiaries_Message' component={beneficiariesMessage} />
                  <Route path='/Beneficiaries_Campaign' component={beneficiariesCampaign} />
                </ul>
              </Router>
              <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' onChange={this.search} value={this.state.term} />
              <button className='btn btn-outline-success my-2 my-sm-0 w3-bar-item w3-button w3-hide-small w3-right w3-hover-red' type='submit'> <i className='fa fa-search' />Search</button>
            </form>
          </div>
        </nav>

        <br />
        {this.state.camp.filter(searching(this.state.term)).map(item =>
          <div>
            <div className='col-sm-4 col-xs-12'>
              <div className='panel panel-default text-center'>
                <div className='panel-heading'>
                  <h1>{item.campaignName}</h1>
                </div>
                <div className='panel-body'>
                  <h2>From : {item.username}</h2>
                  <img alt='Profile' style={{width: '300px'}} src={item.campaignImage || 'https://orig00.deviantart.net/3cc1/f/2012/247/1/b/meelo_facebook_default_profile_picture_by_redjanuary-d5dmoxd.jpg'} />

                </div>
                <p> {item.campaignDescription}</p>
                <div className='panel-footer'>
                  <h3>{item.campaignAmount}</h3><h3>Items</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='modal fade' id='myModal' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>Your Donation Will Make A Difference</h4>
              </div>
              <div className='modal-body'>
                <p>ENTER YOUR AMOUNT</p>
                <h1>Cash💰:</h1>
                <input id='user' type='number' className='input'
                  onChange={
                    this.handlechangeAmount
                  }
                  ref={el => this.input = el} />
                <p>Donations made in JOD</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-default' data-dismiss='modal' onClick={this.submitCompany}>Take</button>
              </div>
            </div>
          </div>
        </div>

        <div className='content'>
          <Route path='/Beneficiaries_Profile' render={() => <beneficiariesProfile />} />
          <Route path='/BeneficiariesMessage' render={() => <beneficiariesMessage />} />
          <Route path='/Beneficiaries_Campaign' render={() => <beneficiariesCampaign />} />

        </div>

      </div>
    )
  }
}
export default Beneficiaries
