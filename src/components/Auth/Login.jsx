import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import googleLogo from '../../images/search.svg'
import facebookLogo from '../../images/facebook.svg'
import './Register.css';
import LeftSide from './LeftSide';
import { Button } from '../../../node_modules/semantic-ui-react';
import firebase from '../../Firebase';



class Login extends React.Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    };

    displayErrors = errors => errors.map((error, i) => <p key={i} >{error.message}</p>)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false });
                })
        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }


    render() {

        const { email, password, errors, loading } = this.state;

        return (
            <Container>
                <div className="main_div">
                    <LeftSide />
                    <form>
                        <div className="right_side">
                            <h2>Get's Started</h2>
                            <p>Don't have account? <Link to="/register">Sign up</Link></p>
                            <div className="google_facebook_sign">
                                <div className="signup">
                                    <div className="logo">
                                        <img src={googleLogo} alt="google" />
                                        <p>Sign up with Google</p>
                                    </div>
                                </div>
                                <div className="signup">
                                    <div className="logo">
                                        <img src={facebookLogo} alt="facebook" />
                                        <p>Sign up with Facebook</p>
                                    </div>
                                </div>
                            </div>
                            <div className="horizontal_line">
                                <p><span>or</span></p>
                            </div>
                            <div className="login_email_div">
                                <p>Email</p>
                                <input type="email" name="email" onChange={this.handleChange} value={email}
                                    className={this.handleInputError(errors, 'email')} />
                            </div>
                            <div className="login_email_div">
                                <p>Password</p>
                                <input type="password" name="password" onChange={this.handleChange} value={password}
                                    className={this.handleInputError(errors, 'password')} />
                            </div>
                        </div>
                        <div className="error">
                            {
                                errors.length > 0 && (
                                    <div >
                                        {this.displayErrors(errors)}
                                    </div>
                                )
                            }
                        </div>
                        <div className="signup_btn">
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                variant="contained"
                                onClick={this.handleSubmit}
                                style={{ width: 430, background: "#ff3856", color: "#fff" }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Login; 