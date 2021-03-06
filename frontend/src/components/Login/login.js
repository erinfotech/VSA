import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {withRouter} from "react-router-dom";
import AuthenticationService from "../../repository/AuthenticationService/authenticationService";
import {AUTH_TOKEN} from "../../shared/utility";

/**
 * @author Natasha Stojanova (natashastojanova6@gmail.com)
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            waitResponse: false,
            errMessage: null,
        }
    }

    setErrorMessage(error) {
        if (error.response.status === 403)
            this.setState({
                errMessage: "Invalid credentials"
            });
        else
            this.setState({
                errMessage: error.response.data,
            })
    }

    clearErrorMessage() {
        this.setState({
            errMessage: null
        })
    }

    handleClick(event) {
        this.clearErrorMessage();
        this.setState({
            waitResponse: true,
        });
        const payload = {
            "username": this.state.username,
            "password": this.state.password
        };
        AuthenticationService.loginUser(payload).then(resp => {
            localStorage.setItem(AUTH_TOKEN, resp.data);
            this.setState({
                waitResponse: false,
            });
            this.props.history.push('/admin');
        }).catch(error => {
            this.setErrorMessage(error);
            this.setState({
                waitResponse: false,
            });
        })
    }

    componentDidMount() {
        if (localStorage.getItem(AUTH_TOKEN) !== null && localStorage.getItem(AUTH_TOKEN) !== undefined)
            this.props.history.push("/admin")
    }

    render() {
        return (
            <div>
                {(!this.state.waitResponse ?
                    <MuiThemeProvider>
                        <div>
                            <h1 className="text-dark">Login</h1>
                            {this.state.errMessage !== null ? <div className="text-center text-danger">
                                <span>{this.state.errMessage}</span>
                            </div> : <div/>}
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({username: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider> :
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}
                         className="container text-black-50 text-lg-center">
                        <img alt="" style={{width: "10%"}}
                             src={require('../../assets/loading.gif')}/>
                        Please wait while we process your request
                    </div>)}
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default withRouter(Login);