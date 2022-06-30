import { Button, Grid, Stack } from '@mui/material';
import Chessboard from 'chessboardjsx';
import React, { Component } from 'react';

class BoardPanel extends Component {
    constructor(props) {
        super(props);
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
                        <Chessboard position="start"/>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <Button>Start</Button>
                            <Button>Reset</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default BoardPanel;