import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const CardBackground = (props: SvgProps) => (
  <Svg width={295} height={174} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#AFB0B5"
        strokeWidth={2}
        d="M0-18C.167-12.667.221-.779 10 9c6 6 21.217 15.86 41 12C71.5 17 78-.5 80-6.5 80.5-8 82.5-18 81.5-22M166 182.737c1-17.5 12.8-55.3 52-66.5 39.2-11.2 69.333 9.334 79.5 21"
      />
      <Path
        stroke="#AFB0B5"
        strokeWidth={2}
        d="M309.161 63c-15.167.5-49.2 10.4-52 50-2.8 39.6 31.666 49.667 54.499 51"
      />
      <Path
        fill="#FF9800"
        d="M231 47V25c0-2.2 1.8-4 4-4h30c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4h-30c-2.2 0-4-1.8-4-4Z"
      />
      <Path
        fill="#FFD54F"
        d="M269 33v-2h-12c-1.1 0-2-.9-2-2s.9-2 2-2h1v-2h-1c-2.2 0-4 1.8-4 4s1.8 4 4 4h3v6h-3c-2.8 0-5 2.2-5 5s2.2 5 5 5h2v-2h-2c-1.7 0-3-1.3-3-3s1.3-3 3-3h12v-2h-7v-6h7Zm-26 6h-3v-6h3c2.2 0 4-1.8 4-4s-1.8-4-4-4h-3v2h3c1.1 0 2 .9 2 2s-.9 2-2 2h-12v2h7v6h-7v2h12c1.7 0 3 1.3 3 3s-1.3 3-3 3h-2v2h2c2.8 0 5-2.2 5-5s-2.2-5-5-5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={295} height={174} fill="#fff" rx={16} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CardBackground;
