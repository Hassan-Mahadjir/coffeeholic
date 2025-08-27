import useBorderColor from "@/hooks/use-Border-Color";
import { Feather } from "@expo/vector-icons";
import React, { RefObject, forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";

type CustomInputProps = TextInputProps & {
  name: string;
  text: string;
  inputType?:
    | "text"
    | "password"
    | "email"
    | "firstName"
    | "lastName"
    | "confirmPassword";
  rules?: any;
  returnKeyType?: TextInputProps["returnKeyType"];
  onSubmitEditing?: () => void; // This prop should be optional and a function
  ref?: RefObject<TextInput>; // Ref for the input field
};

const CustomInputComponent = forwardRef<TextInput, CustomInputProps>(
  (
    { name, rules, text, inputType, onSubmitEditing, returnKeyType, ...props },
    ref
  ) => {
    const { control } = useFormContext();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureEntry = () => setSecureTextEntry((prev) => !prev);
    const { handleOnBlur, handleOnFocus, isOnFocus, borderColor } =
      useBorderColor("tabIconDefault", "tabIconSelected");

    const getPlaceholder = () => {
      switch (inputType) {
        case "password":
          return "********";
        case "email":
          return "example@gmail.com";
        case "firstName":
          return "e.g Hassan";
        case "lastName":
          return "e.g Barakat";
        case "confirmPassword":
          return "Confirm Password";
        default:
          return "";
      }
    };

    return (
      <>
        {text && (
          <ThemedText
            type="subtitle"
            style={{ fontSize: 18, marginBottom: scale(5) }}
          >
            {text}
          </ThemedText>
        )}
        <Controller
          control={control}
          name={name}
          rules={rules} // Use the rules prop here
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: verticalScale(5),
              }}
            >
              <TextInput
                value={value}
                onChangeText={(val) => onChange(val)}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                placeholder={getPlaceholder()}
                returnKeyType={returnKeyType}
                secureTextEntry={inputType === "password" && secureTextEntry}
                style={{
                  height: verticalScale(35),
                  borderColor: borderColor,
                  borderRadius: scale(10),
                  paddingHorizontal: scale(10),
                  borderWidth: isOnFocus ? 2 : 1,
                  fontSize: moderateScale(13),
                }}
                ref={ref} // Attach the ref here
                onSubmitEditing={onSubmitEditing} // Attach the onSubmitEditing handler here
                {...props}
              />
              {inputType === "password" && (
                <Feather
                  name={secureTextEntry ? "eye" : "eye-off"}
                  onPress={toggleSecureEntry}
                  style={{
                    position: "absolute",
                    marginLeft: "90%",
                    marginTop: verticalScale(8),
                  }}
                  size={scale(20)}
                  color="black"
                />
              )}
              {error && (
                <ThemedText
                  style={{ color: "red", fontSize: moderateScale(12) }}
                >
                  {error.message}
                </ThemedText>
              )}
            </View>
          )}
        />
      </>
    );
  }
);

CustomInputComponent.displayName = "CustomInputComponent";

export default CustomInputComponent;
