import { Link, LinkProps } from 'expo-router';
import React from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Text, useThemeColor, View } from './Themed';


type CardProps = {
  title: string;
  children: React.ReactNode;
  href?: LinkProps['href'];
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, children, href, style }: CardProps) {
  const tint = useThemeColor({}, 'tint');
  const cardContent = (
    <View style={[styles.card, { borderLeftColor: tint }, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{cardContent}</Pressable>
      </Link>
    );
  }
  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderLeftWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
