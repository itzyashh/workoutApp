import { Link, router } from "expo-router";
import Colors from "../constants/Colors";
import { Text, View } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import { FlatList, StyleSheet } from "react-native";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";

import Screen from "@/components/general/Screen";
import { useWorkoutStore } from "@/store";



export default function Index() {

  const {currentWorkout, startWorkout, workouts} = useWorkoutStore(state => state);


  const handleStartWorkout = () => {
    startWorkout();
    router.push('/workout/current');
  }


  return (
    <Screen
    >

    {currentWorkout ? (
      <Link href={'/workout/current'} asChild>
      <CustomButton title="Resume Workout" onPress={() => {}} />
      </Link>) : (
        <CustomButton onPress={handleStartWorkout} title="Start New Workout" />
      )}


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
