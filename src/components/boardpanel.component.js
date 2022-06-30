import { Button, Grid, Stack, TextField } from '@mui/material';
import Chessboard from 'chessboardjsx';
import React, { Component } from 'react';
import randPos from '../lib/randPos.js';

class BoardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "start",
            pieceNum: "",
        }

        this.randomPosition = this.randomPosition.bind(this);
        this.resetPosition = this.resetPosition.bind(this);
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
                            <TextField name="pieceNum" label="Piece Num" variant="outlined" onChange={this.handleInputChange}/>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default BoardPanel;