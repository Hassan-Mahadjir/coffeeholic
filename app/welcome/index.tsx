import Onboarding from "@/components/Onboarding";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* <ThemedText>Welcome</ThemedText> */}
      <Onboarding />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
