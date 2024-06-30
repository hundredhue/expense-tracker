import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CreditCard = (props: SvgProps) => (
  <Svg width={51} height={50} fill="none" {...props}>
    <Path
      fill="#FFC107"
      d="M45.86 39.824H4.878a2.99 2.99 0 0 1-2.987-2.98V13.156a2.99 2.99 0 0 1 2.987-2.98H45.86a2.99 2.99 0 0 1 2.987 2.98v23.688a2.99 2.99 0 0 1-2.987 2.98Z"
    />
    <Path fill="#424242" d="M1.887 15.188H48.85v6.277H1.887v-6.277Z" />
    <Path
      fill="#fff"
      d="M45.022 28.96H5.739a.702.702 0 0 1-.7-.698v-3.285c0-.383.313-.7.7-.7h39.283c.384 0 .7.313.7.7v3.285a.707.707 0 0 1-.7.699Z"
    />
    <Path
      stroke="#424242"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M9.698 27.535c.22-.422.278-.914.474-1.348.195-.433.622-.835 1.092-.761.435.07.705.504.865.91.223.566.345 1.172.36 1.781.004.125-.004.262-.086.36-.145.164-.442.082-.556-.106-.113-.187-.086-.426-.035-.64a3.093 3.093 0 0 1 2-2.165.62.62 0 0 1 .314-.043c.227.043.352.278.454.48.24.466.529.907.862 1.31.133.164.285.324.489.386.67.195 1.057-.789 1.703-1.05.775-.313 1.531.503 2.353.656 1.202.222 1.84-.711 2.894-.95a.91.91 0 0 1 .434-.011c.259.074.42.32.572.543.356.523.865 1.039 1.5 1.043.403.004.775-.203 1.143-.38 1.304-.62 2.842-.878 4.205-.402"
    />
  </Svg>
);
export default CreditCard;
