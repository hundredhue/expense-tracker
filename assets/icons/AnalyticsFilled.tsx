import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const AnalyticsFilled = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#819595"
      fillRule="evenodd"
      d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm10 2a1 1 0 0 0-2 0v8a1 1 0 0 0 2 0V8Zm-4 3a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0v-5Zm8 3a1 1 0 0 0-2 0v2a1 1 0 0 0 2 0v-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AnalyticsFilled;
