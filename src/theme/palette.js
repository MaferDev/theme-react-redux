import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';


export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark:'#006464',
    main: '#019998',
    light: '#00C0BD'
  },
  secondary: {
    contrastText: white,
    dark: '#4e4e4e',
    main: '#707070',
    light: '#8c8c8c'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: { 
    contrastText: white,
    dark:'#980407',
    main: '#DA070B',
    light: '#e1383b'
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  danger: {
    contrastText: white,
    dark: colors.deepOrange[900],
    main: colors.deepOrange[600],
    light: colors.deepOrange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: '#019998'
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  personalized:{
    garylight:'#F3F3F3',
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
