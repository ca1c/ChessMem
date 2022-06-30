import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import BoardPanel from './boardpanel.component';
import { Grid } from '@mui/material';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h3" sx={{textAlign: "center"}}>ChessMem</Typography>
                    </Grid>
                    <Grid item>
                        <BoardPanel />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Main;