import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { sign_up, show_message } from 'states/account-actions.js';
import Input from 'material-ui/Input/Input';
import Grid from 'material-ui/Grid';

import AccountcircleIcon from 'material-ui-icons/Accountcircle';
import LockIcon from 'material-ui-icons/Lock';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import './SignUp.css';

class SignUp extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_username: "",
            temp_email: "",
            temp_password: "",
            temp_passport: "",
            open: true
        };

        this.handleSignup = this.handleSignup.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestClose_success = this.handleRequestClose_success.bind(this);
    }

    handleRequestClose() {
        this.setState({ open: false });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    handleRequestClose_success() {
        this.setState({ open: false });
        this.setState({ temp_username: "", temp_email: "", temp_password: "", temp_passport: "" });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message === "Nothing Happen") this.setState({ open: true });
    }

    render() {
        const { message } = this.props;

        return (
            <div className='signup'>

                <Grid
                    container
                    align='center'
                    direction='column'
                    justify='center'
                >
                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='username'
                    >
                        <Grid item>
                            <Input
                                placeholder='姓名'
                                value={this.state.temp_username}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_username: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='email'
                    >
                        <Grid item>
                            <Input
                                placeholder='電子郵件'
                                value={this.state.temp_email}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_email: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='password'
                    >
                        <Grid item>
                            <Input
                                placeholder='密碼'
                                value={this.state.temp_password}
                                type='password'
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_password: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='passport'
                    >
                        <Grid item>
                            <Input
                                placeholder='護照號碼'
                                value={this.state.temp_passport}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_password: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='submit'
                    >
                        <Grid item>
                            <Button raised color="accent" onClick={this.handleSignup}>
                                使用Email註冊
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

                {message === "Account Exist!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>{"Account Exist"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please try another account!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                {message === "Finish Sign Up!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose_success}>
                        <DialogTitle>{"Sign Up Success!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Go to Log In!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose_success} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        );
    }

    handleSignup() {
        const { temp_username, temp_email, temp_password, temp_passport } = this.state;
        this.props.dispatch(sign_up(temp_username, temp_email, temp_password, temp_passport));
    }
}

export default connect(state => state.account)(SignUp);