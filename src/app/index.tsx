import { Link } from "expo-router";
import Colors from "../constants/Colors";
import { Text, View } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import { StyleSheet } from "react-native";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";

export default function Index() {

  return (
    <View
      style={styles.container}
    >
      <CustomButton title="Resume Workout" onPress={() => {}} />
      <View style={{ height: 20 }} />
        <WorkoutListItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
})
