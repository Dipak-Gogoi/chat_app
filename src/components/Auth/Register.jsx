import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import googleLogo from '../../images/search.svg'
import facebookLogo from '../../images/facebook.svg'
import './Register.css';
import LeftSide from './LeftSide';
import { Button } from '../../../node_modules/semantic-ui-react';
import firebase from '../../Firebase';
import md5 from 'md5';


class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: '* Fill in all fields' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: '* Password is invalid' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfirm }) => {
        return !username.length || !email.length || !password.length || !passwordConfirm.length;
    }

    isPasswordValid = ({ password, passwordConfirm }) => {
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i} >{error.message}</p>)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log('user saved')
                            })
                        })
                        .catch(err => {
                            console.error(err);
                            this.setState({ errors: this.state.errors.concat(err), loading: false });
                        })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false });
                })
        }
    }

    saveUser = createdUser => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        });
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }


    render() {

        const { username, email, password, passwordConfirm, errors, loading } = this.state;

        return (
            <Container>
                <div className="main_div">
                    <LeftSide />
                    <form>
                        <div className="right_side">
                            <h2>Get's Started</h2>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
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
                                <p>Username</p>
                                <input type="text" name="username" onChange={this.handleChange} value={username} />
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
                            <div className="login_email_div">
                                <p>Confirm Password</p>
                                <input type="password" name="passwordConfirm" onChange={this.handleChange} value={passwordConfirm}
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
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Register; 