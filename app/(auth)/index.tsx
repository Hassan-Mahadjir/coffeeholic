import CustomInputComponent from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { loginFormValues } from "@/types/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { z } from "zod";

export default function LoginScreen() {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "text");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const formSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const methods = useForm<loginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: loginFormValues) => {
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

        <View style={styles.horizontalLineContainer}>
          <View
            style={[styles.horizontalLine, { backgroundColor: textColor }]}
          />
          <ThemedText type="default" style={{ marginHorizontal: scale(10) }}>
            or login with
          </ThemedText>
          <View
            style={[styles.horizontalLine, { backgroundColor: textColor }]}
          />
        </View>

        <TouchableOpacity
          style={[styles.socialButton, { borderColor: borderColor }]}
          onPress={handleGoogleLogin}
        >
          <AntDesign name="google" size={24} color={textColor} />
          <ThemedText style={{ marginLeft: 8 }}>Sing in with Google</ThemedText>
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={[styles.socialButton, { borderColor: borderColor }]}
            onPress={handleAppleLogin}
          >
            <AntDesign name="apple1" size={24} color={textColor} />
            <ThemedText style={{ marginLeft: 8 }}>
              Sign in with Apple
            </ThemedText>
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
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    borderWidth: 1,
    marginTop: verticalScale(8),
    width: "100%",
    justifyContent: "center",
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: scale(15),
  },
  horizontalLine: {
    flex: 1,
    height: 1,
  },
});
