import { useThemeColor } from "@/hooks/useThemeColor";
import { useCallback, useState } from "react";

const useBorderColor = (
  defaultColorKey: "tint" | "tabIconDefault",
  focusColorKey: "tabIconSelected"
) => {
  const defaultColor = useThemeColor({}, defaultColorKey);
  const focusColor = useThemeColor({}, focusColorKey);
  const [borderColor, setBorderColor] = useState<string>(defaultColor);
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);

  const handleOnFocus = useCallback(() => {
    setIsOnFocus(true);
    setBorderColor(focusColor);
  }, [focusColor]);

  const handleOnBlur = useCallback(() => {
    setIsOnFocus(false);
    setBorderColor(defaultColor);
  }, [defaultColor]);

  return {
    borderColor,
    isOnFocus,
    handleOnFocus,
    handleOnBlur,
  };
};

export default useBorderColor;
