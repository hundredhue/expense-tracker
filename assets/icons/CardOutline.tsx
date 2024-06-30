import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CardOutline = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      stroke="#f9fafb"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.792 5H5.542a2.625 2.625 0 0 0-2.625 2.625v9.75A2.625 2.625 0 0 0 5.542 20h14.25a2.625 2.625 0 0 0 2.625-2.625v-9.75A2.625 2.625 0 0 0 19.792 5Z"
    />
    <Path
      stroke="#f9fafb"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.917 9.5h19.5m-15.75 5.063h2.25v.937h-2.25v-.938Z"
    />
  </Svg>
);
export default CardOutline;
