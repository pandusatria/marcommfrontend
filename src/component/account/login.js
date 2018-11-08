import React, { Component } from 'react';
import userapi from '../../handler/user';
import appconfig from '../../config/app.config.json';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formdata: {
          username: '',
          password: ''
        },
        isRequest: false,
        alert: false,
        errors: {} 
    };

    this.textChanged = this.textChanged.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.alertDissmis = this.alertDissmis.bind(this);
  };

  textChanged(e) {
      let tmp = this.state.formdata;
      tmp[e.target.name] = e.target.value;
      this.setState({
          formdata: tmp
      });
  };

  handleValidation() {
    let fields = this.state.formdata;
    let errors = {};
    let formIsValid = true;

    if(!fields.username) {
      formIsValid = false;
      errors.username = "username cannot be empty";
    } else if(!fields.username.match(/^(?=.*\d).{8,}$/)) {
      formIsValid = false;
      errors.username = "username must be contain letter and number, length minimal 8"
    }
    
    if(!fields.password) {
      formIsValid = false;
      errors.password = "password cannot be empty";
    } else if(!fields.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
      // regex uppercase, letter and number minimal 8
      // (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      formIsValid = false;
      errors.password = "password must be contain uppercase, letter and number, length minimal 8"
    }

    this.setState({errors: errors});
    return formIsValid;
  };

  alertDissmis() {
    this.setState({
      alert: true
    });
  }

  async onSignIn() {
      
      if(this.handleValidation()) {
          this.setState({
              isRequest: true
          });

          console.log("OnSignIn clicked");

          let result = await userapi.login(this.state.formdata.username, this.state.formdata.password);

          if(result.status === 200) {
            console.log("Please wait...");

            localStorage.setItem(appconfig.secure_key.userdata, JSON.stringify(result.message.userdata));
            localStorage.setItem(appconfig.secure_key.token, result.message.token);

            console.log(localStorage.getItem(appconfig.secure_key.userdata));

            this.props.history.push('/dashboard');
          } else if(result.status === 404) {
            this.setState({
              alert: true
            });
          } else {
            console.log(result.message);
            this.setState({
              alert: true
            });
          }

          this.setState({
              isRequest: false
          });
      }

  };

  render() {
    return (
      <React.Fragment>
        <div className="login-box">
        {
            (this.state.alert === true) ?
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              <p><i className="icon fa fa-ban"></i> Alert! Username or Password does not exist</p>
            </div> : ''
        }
        <div className="login-box-body">
              <p className="login-box-msg">Sign in to start your session on Marcomm APP</p>
              <form method="post">
                  <div className="form-group has-feedback">
                    <input className="form-control"
                      type="username"
                      name="username"
                      id="username"
                      placeholder="masukkan username"
                      required=""
                      value={ this.state.username } 
                      onChange={ this.textChanged } />
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    <span style={{color: "red"}}>{this.state.errors.username}</span>
                  </div>
                  <div className="form-group has-feedback">
                    <input 
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="masukkan password"
                      required="" 
                      value={ this.state.password } 
                      onChange={ this.textChanged }
                    />
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    <span style={{color: "red"}}>{this.state.errors.password}</span>
                  </div>
                  <div className="row">
                    <div className="col-xs-4">
                      <button disabled={ this.state.isRequest } type="button" onClick={ this.onSignIn } className="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                  </div>
              </form>
        </div>
        
      </div>
      </React.Fragment>
    )
  }
}

export default login;