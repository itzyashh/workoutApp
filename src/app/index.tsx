import { Link } from "expo-router";
import Colors from "../constants/Colors";
import { Text, View } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import { FlatList, StyleSheet } from "react-native";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import workouts from "@/data/dummyWorkouts";
import Screen from "@/components/general/Screen";

const workout = workouts[0];

export default function Index() {

  return (
    <Screen
    >
      <Link href={'/workout/current'} asChild>
      <CustomButton title="Resume Workout" onPress={() => {}} />
      </Link>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 16, gap: 16 }}
        renderItem={({ item }) => (
          <WorkoutListItem workout={item} />
        )}
      />
        
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: undefined,
    padding: 4,
  },
})
