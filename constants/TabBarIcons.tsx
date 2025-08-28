import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

export const icons = {
  index: (color: string) => (
    <Octicons name="home" size={moderateScale(24)} color={color} />
  ),
  suggestions: (color: string) => (
    <MaterialIcons name="smart-toy" size={moderateScale(24)} color={color} />
  ),
  explore: (color: string) => (
    <FontAwesome name="search" size={moderateScale(24)} color={color} />
  ),
  settings: (color: string) => (
    <Ionicons name="settings-sharp" size={moderateScale(24)} color={color} />
  ),
};
