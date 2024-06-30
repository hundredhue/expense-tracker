import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CashFilled = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#819595"
      fillRule="evenodd"
      d="M4 4.25A2.75 2.75 0 0 0 1.25 7v10A2.75 2.75 0 0 0 4 19.75h16A2.75 2.75 0 0 0 22.75 17V7A2.75 2.75 0 0 0 20 4.25H4Zm15.067 8.251a.75.75 0 1 0-1.114-1.004l-.01.011a.75.75 0 1 0 1.114 1.004l.01-.011Zm-13.055-1.06a.75.75 0 0 1 .055 1.06l-.01.011a.75.75 0 1 1-1.114-1.004l.01-.011a.75.75 0 0 1 1.059-.055M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CashFilled;
