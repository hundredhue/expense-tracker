import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UserOutline = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      fill="#f9fafb"
      fillRule="evenodd"
      d="M12 1.75a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM8.75 6.5a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM12 12.75c-2.313 0-4.445.526-6.024 1.414C4.42 15.04 3.25 16.366 3.25 18v.102c-.001 1.162-.002 2.62 1.277 3.662.629.512 1.51.877 2.7 1.117 1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117 1.279-1.042 1.277-2.5 1.276-3.662V18c0-1.634-1.17-2.96-2.725-3.836-1.58-.888-3.711-1.414-6.025-1.414ZM4.75 18c0-.851.622-1.775 1.961-2.528 1.316-.74 3.184-1.222 5.29-1.222 2.104 0 3.972.482 5.288 1.222 1.34.753 1.961 1.677 1.961 2.528 0 1.308-.04 2.044-.724 2.6-.37.302-.99.597-2.05.811-1.057.214-2.502.339-4.476.339-1.974 0-3.42-.125-4.476-.339-1.06-.214-1.68-.509-2.05-.81-.684-.557-.724-1.293-.724-2.601Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default UserOutline;
