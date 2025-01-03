
import Colors from '@/constants/Colors';
import { 
    View as RNView,
    Text as RNText,
    TextInput as RNTextInput,
    useColorScheme
} from 'react-native';

type ThemedProps = {
    lightColor?: string;
    darkColor?: string;
}

export type ViewProps = ThemedProps & RNView['props'];
export type TextProps = ThemedProps & RNText['props'];
export type TextInputProps = ThemedProps & RNTextInput['props'];

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];
  
    if (colorFromProps) {
      return colorFromProps;
    } else {
      return Colors[theme][colorName];
    }
  }
  
export function View(props: ViewProps) {
    const { lightColor, darkColor, style, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
    return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
  }

export function Text(props: TextProps) {
    const { lightColor, darkColor, style, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
    return <RNText style={[{ color }, style]} {...otherProps} />;
  }

export function TextInput(props: TextInputProps) {
    const { lightColor, darkColor, style, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const backgroundColor = useThemeColor(
      { light: props.lightColor, dark: props.darkColor },
      'textInputBackground'
    );
  
    return (
      <RNTextInput
        style={[{ color, backgroundColor }, style]}
        placeholderTextColor={Colors.light.tabIconDefault}
        {...otherProps}
      />
    );
  }



