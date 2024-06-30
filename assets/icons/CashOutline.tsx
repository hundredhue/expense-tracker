import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CashOutline = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      stroke="#f9fafb"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.333 17.5v-10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-16a2 2 0 0 1-2-2Z"
    />
    <Path
      stroke="#f9fafb"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18.833 12.51.01-.011m-13.01.011.01-.011m6.49 3.001a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
    />
  </Svg>
);
export default CashOutline;
