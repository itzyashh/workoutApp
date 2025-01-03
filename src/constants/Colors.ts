import { DarkTheme } from "@react-navigation/native";

const tintColorLight = '#8A2BE2'; // BlueViolet
const tintColorDark = '#a744fd'; // DarkViolet



export default {
  light: {
    text: '#4B0082', // Indigo
    background: '#E6E6FA', // Lavender
    tint: tintColorLight,
    tabIconDefault: '#D8BFD8', // Thistle
    tabIconSelected: tintColorLight,
    textInputBackground: '#F8F8FF', // GhostWhite
    separator: 'rgba(216, 191, 216, 0.500)', // Thistle 
  },
  dark: {
    text: '#E6E6FA', // Lavender
    background: 'rgb(19, 19, 19)', // Black
    tint: tintColorDark,
    tabIconDefault: '#DDA0DD', // Plum
    tabIconSelected: tintColorDark,
    textInputBackground: '#483D8B', // DarkSlateBlue
    separator: 'rgba(221, 160, 221, 0.500)', // Plum
  },
};