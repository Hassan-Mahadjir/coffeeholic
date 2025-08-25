import CustomInputComponent from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function LoginScreen() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const methods = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: any) => {
    // Handle login logic here
    console.log("login form: ", data);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  const handleAppleLogin = () => {
    // Handle Apple login logic here
  };

  return (
    <FormProvider {...methods}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ marginBottom: verticalScale(10) }}>
          Welcome
        </ThemedText>
        <CustomInputComponent
          name="email"
          text="Email"
          inputType="email"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <CustomInputComponent
          name="password"
          text="Password"
          inputType="password"
          returnKeyType="done"
          ref={passwordRef}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={methods.handleSubmit(onSubmit)}
        >
          <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
            Login
          </ThemedText>
        </TouchableOpacity>
        <ThemedText style={{ marginVertical: verticalScale(10) }}>
          Or login with
        </ThemedText>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleGoogleLogin}
        >
          <Feather name="user" size={24} color="#4285F4" />
          <ThemedText style={{ marginLeft: 8 }}>Google</ThemedText>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleAppleLogin}
          >
            <Feather name="lock" size={24} color="#000" />
            <ThemedText style={{ marginLeft: 8 }}>Apple</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: scale(16),
  },
  loginButton: {
    backgroundColor: "#836c4ee6",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(32),
    borderRadius: scale(24),
    marginTop: verticalScale(16),
    alignItems: "center",
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    marginTop: verticalScale(8),
    width: "100%",
    justifyContent: "center",
  },
});
