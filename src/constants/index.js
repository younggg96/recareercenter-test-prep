import { Dimensions, Platform } from "react-native";
// import { colors } from "./index.style";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(70);
const itemHorizontalMargin = wp(2);

export const slideHeight = viewportHeight * 0.36;
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 10;
// export const sliderWidth = 300;
// export const itemWidth = 200;
