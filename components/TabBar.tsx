import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TabBarButton from "./TabBarButton";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabbarLayout}
      style={[
        styles.tabBar,
        {
          backgroundColor: useThemeColor({}, "background"),
          shadowColor: useThemeColor({}, "text"),
        },
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: buttonWidth - moderateScale(20),
            height: dimensions.height - verticalScale(10),
            borderRadius: moderateScale(30),
            backgroundColor: useThemeColor({}, "tabIconSelected"),
            marginHorizontal: moderateScale(10),
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tintColor = isFocused
          ? useThemeColor({}, "text")
          : useThemeColor({}, "tabIconDefault");

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 350,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            label={label as string}
            routeName={route.name}
            tintColor={tintColor}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: verticalScale(35),
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(30),
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(10),
    shadowOffset: {
      width: 0,
      height: verticalScale(8),
    },
    shadowRadius: moderateScale(5),
    shadowOpacity: 0.2,
  },
  // tabBarItem: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: moderateScale(5),
  // },
});
