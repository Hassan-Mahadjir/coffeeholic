import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <View
      style={[{ backgroundColor, direction: isRTL ? "rtl" : "ltr" }, style]}
      {...otherProps}
    />
  );
}
