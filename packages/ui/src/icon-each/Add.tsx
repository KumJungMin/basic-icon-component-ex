import React from "react";
import { ISvgIconProps, IconWrapper } from "./helper";

export default IconWrapper("add", (props: ISvgIconProps) => (
  <svg width={props.size} height={props.size} viewBox="0 0 48 48" fill="none">
    <rect
      x="6"
      y="6"
      width="36"
      height="36"
      rx="3"
      fill={props.colors[1]}
      stroke={props.colors[0]}
      strokeWidth={props.strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M24 16V32"
      stroke={props.colors[2]}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 24L32 24"
      stroke={props.colors[2]}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
