import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { search_flight, search_flight_by_destination } from 'api/flight.js';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input/Input';
import Grid from 'material-ui/Grid';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import './Find.css';

class Find extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_airport_code: "",
            temp_date: "",
            temp_departure: "",
            temp_arrival: "",
            open: true,
            open_success: true
        };

        this.handleFind = this.handleFind.bind(this);
        this.handleFind_2 = this.handleFind_2.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestClose_success = this.handleRequestClose_success.bind(this);
    }

    handleRequestClose() {
        this.setState({ open: false });
    }

    handleRequestClose_success() {
        this.setState({ open: false });
        this.setState({ temp_airport_code: "", temp_date: "" });
    }

    render() {

        return (

            <div className='find'>
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
                        className='airport_code'
                    >
                        <Grid item>
                            <Input
                                placeholder='請輸入航班號碼'
                                value={this.state.temp_airport_code}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_airport_code: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='date'
                    >
                        <Grid item>
                            <Input
                                placeholder='請選擇出發日期'
                                value={this.state.temp_date}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_date: event.target.value })}
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
                            <Button raised color="accent" onClick={this.handleFind}>
                                搜尋
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

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
                        className='departure'
                    >
                        <Grid item>
                            <Input
                                placeholder='請選擇出發地'
                                value={this.state.temp_departure}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_departure: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='arrival'
                    >
                        <Grid item>
                            <Input
                                placeholder='請選擇目的地'
                                value={this.state.temp_arrival}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_arrival: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='date'
                    >
                        <Grid item>
                            <Input
                                placeholder='請選擇出發日期'
                                value={this.state.temp_date}
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_date: event.target.value })}
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
                            <Button raised color="accent" onClick={this.handleFind_2}>
                                搜尋
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </div >
        );
    }

    handleFind() {
        const { temp_airport_code, temp_date } = this.state;
        search_flight(temp_airport_code, temp_date).then(infor => {
            console.log(infor);
        }).catch(err => {
            console.error('Error getting flight', err);
        });
    }

    handleFind_2() {
        const { temp_departure, temp_arrival, temp_date } = this.state;
        search_flight_by_destination(temp_departure, temp_arrival, temp_date).then(infor => {
            console.log(infor);
        }).catch(err => {
            console.error('Error getting flight', err);
        });
    }

}

export default connect()(Find);
