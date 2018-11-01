import React, { Component } from 'react';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        username: '',
        password: ''
      },
      isRequest: false
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.textChanged = this.textChanged.bind(this);
  }

  textChanged(e) {
      let tmp = this.state.formdata;
      tmp[e.target.name] = e.target.value;
      this.setState({
          formdata: tmp
      });
  }

  async onSignIn() {

  }

  render() {
    return (
      <div className="login-box">
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
                      value={this.state.username} 
                      onChange={this.textChanged} />
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                  </div>
                  <div className="form-group has-feedback">
                    <input 
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="masukkan password"
                      required="" 
                      value={this.state.password} 
                      onChange={this.textChanged}
                    />
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                  </div>
                  <div className="row">
                    <div className="col-xs-4">
                      <button disabled={this.state.isRequest} type="button" onClick={this.onSignIn} className="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                  </div>
              </form>
        </div>
      </div>
    )
  }
}

export default login;