import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const HomeFilled = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      fill="#819595"
      d="m21.444 9.973-1.67 10a3 3 0 0 1-1 1.79 3.21 3.21 0 0 1-2 .7h-9.61a3 3 0 0 1-2.93-2.49l-1.67-10a3 3 0 0 1 .23-1.7 3 3 0 0 1 1.12-1.29l6.48-4a3 3 0 0 1 3.15 0l6.47 4c.507.3.911.747 1.16 1.28a3 3 0 0 1 .27 1.71Z"
    />
  </Svg>
);
export default HomeFilled;
