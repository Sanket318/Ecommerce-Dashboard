import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '3rem', color: '#111827' },
    h2: { fontWeight: 600, fontSize: '2rem', color: '#111827' },
    body1: { fontSize: '1rem', color: '#6b7280' },
  },
  palette: {
    background: { default: '#ffffff', paper: '#ffffff' },
    primary: { main: '#111827' },
    secondary: { main: '#3b82f6' },
  },
  shape: { borderRadius: 12 },
});

export default theme;
