import { Button, Grid, InputLabel, ListItemText, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import Chessboard from 'chessboardjsx';
import React, { Component } from 'react';
import randPos from '../lib/randPos.js';
import compareObj from '../lib/compareObj.js';
import BOARD_THEMES from '../lib/boardThemes.js';
import BOARD_THEMES_OBJ from '../lib/boardThemesObj.js';
import { Box, Container } from '@mui/system';

class BoardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "start",
            comparisonPosition: {},
            pieceNum: "5",
            optionsOpen: false,
            boardTheme: "default",
            timerSeconds: "30",
            timer: "00",
            correct: false,
            editable: false,
        }

        this.randomPosition = this.randomPosition.bind(this);
        this.resetPosition = this.resetPosition.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeBoardTheme = this.changeBoardTheme.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.startComparison = this.startComparison.bind(this);
    }

    randomPosition() {
        let vm = this;

        this.setState((prevState) => ({
            position: randPos(parseInt(prevState.pieceNum)),
            timer: parseInt(prevState.timerSeconds)
        }), function() {
            let timerFunc = setInterval(function() {
                vm.setState((prevState) => ({
                    timer: prevState.timer - 1,
                }))
                if (vm.state.timer < 2) {
                    console.log('ran');
                    clearInterval(timerFunc);
                    vm.clearBoard();
                }
            }, 1000)
        })
    }

    clearBoard() {
        this.setState((prevState) => ({
            position: "",
            comparisonPosition: prevState.position,
            editable: true,
        }))
    }

    startComparison() {
        if(compareObj(this.state.position, this.state.comparisonPosition)) {
            console.log("correct")
            this.setState({
                correct: true,
                position: "start",
                editable: false,
            })
        }
        else {
            console.log("incorrect");
            this.setState({
                correct: false
            })
        }
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

    changeBoardTheme(e) {
        this.setState({
            boardTheme: e.target.value
        })
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
                        <Chessboard 
                            position={this.state.position}
                            getPosition={this.state.editable ? position => this.setState({ position: position }) : position => console.log(position)}
                            sparePieces={this.state.editable}
                            darkSquareStyle={{backgroundColor: BOARD_THEMES_OBJ[this.state.boardTheme]["dark"]}}
                            lightSquareStyle={{backgroundColor: BOARD_THEMES_OBJ[this.state.boardTheme]["light"]}}
                        />
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <Button onClick={this.randomPosition}>Start</Button>
                            <Button variant="outlined" onClick={this.toggleOptions}>Options</Button>
                            <Button onClick={this.startComparison}>Compare</Button>
                            <Button variant="contained" disabled>00:{this.state.timer}</Button>
                            <Button variant="outlined" disabled>{this.state.correct ? "Correct" : "Incorrect"}</Button> 
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Container maxWidth="sm">
                            <Typography variant="h4">Usage</Typography>
                            <Stack direction="column" spacing={3}>
                                <Typography variant="body1">
                                    First click the "Options" button and change the options to your liking. Change the piece number section to the number of pieces on the board that you wish to memorize. Change the timer seconds to the number of seconds you wish for the position to be displayed. Then (optional) change the board theme to one of the provided board themes!
                                </Typography>
                                <Typography>
                                    Next click the "Start" button, a random position with the selected number of pieces will appear, the timer will then count down, take this time to memorize the position.
                                </Typography>
                                <Typography>
                                    Once the timer runs out the board, position will clear, and you need to use the extra pieces outside the board to recreate the position shown
                                </Typography>
                                <Typography>
                                    Once you are done recreating the position, click the "compare" button. Text will show that you are either correct or incorrect.
                                </Typography>
                            </Stack>
                        </Container>
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
                                        <TextField name="timerSeconds" label="Timer Amount (s)" variant="outlined" value={this.state.timerSeconds} onChange={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item>
                                        <InputLabel>Board Theme</InputLabel>
                                        <Select
                                            
                                            value={this.state.boardTheme}
                                            label="Board Theme"
                                            onChange={this.changeBoardTheme}
                                        >
                                            {BOARD_THEMES.map((bTheme) => (
                                                <MenuItem value={bTheme.name}>
                                                    <Box sx={{
                                                        width: "25px",
                                                        height: "25px",
                                                        background: bTheme.dark,
                                                        margin: "0",
                                                        padding: "0",
                                                    }}/>
                                                    <Box sx={{
                                                        width: "25px",
                                                        height: "25px",
                                                        background: bTheme.light,
                                                        margin: "0",
                                                        padding: "0",
                                                    }}/>
                                                    <ListItemText primary={bTheme.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={this.toggleOptions}>Close</Button>
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