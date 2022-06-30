import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './components/main.component';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
      mode: 'dark',
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
