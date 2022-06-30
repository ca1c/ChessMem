import { Button, Grid, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import Chessboard from 'chessboardjsx';
import React, { Component } from 'react';
import randPos from '../lib/randPos.js';
import BOARD_THEMES from '../lib/boardThemes.js';

class BoardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "start",
            pieceNum: "",
            optionsOpen: false,
            boardTheme: "default"
        }

        this.randomPosition = this.randomPosition.bind(this);
        this.resetPosition = this.resetPosition.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    randomPosition() {
        this.setState((prevState) => ({
            position: randPos(parseInt(prevState.pieceNum)),
        }))
    }

    resetPosition() {
        this.setState({
            position: "start",
        })
    }

    toggleOptions() {
        this.setState((prevState) => ({
            optionsOpen: prevState.optionsOpen ? false : true,
        }))
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    render() {
        return(
            <div>
                <Grid 
                    container
                    direction="column"
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Chessboard position={this.state.position}/>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <Button onClick={this.randomPosition}>Start</Button>
                            <Button onClick={this.resetPosition}>Reset</Button>
                            <Button onClick={this.toggleOptions}>Options</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Modal
                    open={this.state.optionsOpen}
                    onClose={this.toggleOptions}
                >
                    <Grid
                            container
                            direction="column"
                            spacing={0}
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                minHeight: '80vh',
                            }}
                    >
                        <Grid item>
                            <Paper sx={{
                                padding: "30px",
                                maxWidth: "900px",
                                minHeight: "70vh",
                                maxHeight: "70vh",
                                position: "relative",
                                margin: "0",
                                overflow: "auto",
                            }}
                            >
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Typography variant="h3" sx={{textAlign: "center"}}>Options</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField name="pieceNum" label="Piece Num" variant="outlined" value={this.state.pieceNum} onChange={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField name="timerAmount" label="Timer Amount (s)" variant="outlined"/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default BoardPanel;