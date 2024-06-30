import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const HomeOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#f9fafb"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19.633 7.11-6.474-4.02a2.228 2.228 0 0 0-2.362 0L4.324 7.133A2.228 2.228 0 0 0 3.31 9.362l1.67 10.027a2.228 2.228 0 0 0 2.228 1.86h9.582a2.229 2.229 0 0 0 2.229-1.86l1.67-10.027a2.228 2.228 0 0 0-1.058-2.251"
    />
  </Svg>
);
export default HomeOutline;
