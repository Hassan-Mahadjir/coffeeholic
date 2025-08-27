import CustomInputComponent from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import AntDesign from "@expo/vector-icons/AntDesign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { z } from "zod";

export default function SignupScreen() {
  const router = useRouter();
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "text");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const formSchema = z
    .object({
      name: z.string().min(2, "Name is required"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    // Handle signup logic here
    console.log("signup form: ", data);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
  };

  const handleAppleSignup = () => {
    // Handle Apple signup logic here
  };

  const isFormValid =
    methods.formState.isValid &&
    methods.watch("name") &&
    methods.watch("email") &&
    methods.watch("password") &&
    methods.watch("confirmPassword");
  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <ThemedView style={styles.container}>
          <ThemedText
            type="title"
            style={{
              marginBottom: verticalScale(10),
              textAlign: "center",
              top: verticalScale(-10),
            }}
          >
            Create Account
          </ThemedText>
          <CustomInputComponent
            name="name"
            text="Name"
            inputType="name"
            returnKeyType="next"
            ref={nameRef}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
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
            returnKeyType="next"
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />
          <CustomInputComponent
            name="confirmPassword"
            text="Confirm Password"
            inputType="password"
            returnKeyType="done"
            ref={confirmPasswordRef}
          />
          <TouchableOpacity
            style={[styles.signupButton, { opacity: isFormValid ? 1 : 0.5 }]}
            onPress={methods.handleSubmit(onSubmit)}
            disabled={!isFormValid}
          >
            <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>
          <View style={{ marginVertical: verticalScale(16) }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginVertical: scale(15),
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: textColor }}
              />
              <ThemedText
                type="default"
                style={{ marginHorizontal: scale(10) }}
              >
                or sign up with
              </ThemedText>
              <View
                style={{ flex: 1, height: 1, backgroundColor: textColor }}
              />
            </View>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: borderColor }]}
              onPress={handleGoogleSignup}
            >
              <AntDesign name="google" size={24} color={textColor} />
              <ThemedText style={{ marginLeft: 8 }}>
                Sign up with Google
              </ThemedText>
            </TouchableOpacity>
            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: borderColor }]}
                onPress={handleAppleSignup}
              >
                <AntDesign name="apple1" size={24} color={textColor} />
                <ThemedText style={{ marginLeft: 8 }}>
                  Sign up with Apple
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: verticalScale(5),
            }}
          >
            <ThemedText type="default">Do you have an account? </ThemedText>
            <ThemedText
              type="link"
              style={{ color: "#836c4ee6", marginTop: verticalScale(-2) }}
              onPress={() => router.replace("/(auth)")}
            >
              Login
            </ThemedText>
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: scale(16),
  },
  signupButton: {
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
});
