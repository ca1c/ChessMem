import { Button, Grid, InputLabel, ListItemText, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import Chessboard from 'chessboardjsx';
import React, { Component } from 'react';
import randPos from '../lib/randPos.js';
import compareObj from '../lib/compareObj.js';
import BOARD_THEMES from '../lib/boardThemes.js';
import BOARD_THEMES_OBJ from '../lib/boardThemesObj.js';
import { Box } from '@mui/system';

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
            sparePieces: true,
            correct: false,
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
        this.setState((prevState) => ({
            position: randPos(parseInt(prevState.pieceNum)),
        }))
    }

    clearBoard() {
        this.setState((prevState) => ({
            position: "",
            comparisonPosition: prevState.position,
        }))
    }

    startComparison() {
        if(compareObj(this.state.position, this.state.comparisonPosition)) {
            console.log("correct")
            this.setState({
                correct: true,
                position: "start",
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
                            getPosition={position => this.setState({ position: position })}
                            sparePieces={this.state.sparePieces}
                            darkSquareStyle={{backgroundColor: BOARD_THEMES_OBJ[this.state.boardTheme]["dark"]}}
                            lightSquareStyle={{backgroundColor: BOARD_THEMES_OBJ[this.state.boardTheme]["light"]}}
                        />
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <Button onClick={this.randomPosition}>Start</Button>
                            <Button onClick={this.resetPosition}>Reset</Button>
                            <Button onClick={this.toggleOptions}>Options</Button>
                            <Button onClick={this.clearBoard}>Clear</Button>
                            <Button onClick={this.startComparison}>Compare</Button>
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