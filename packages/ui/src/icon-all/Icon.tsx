import React, { forwardRef } from "react";
import SVG from "react-inlinesvg";

interface IconProps {
  name: string;
  size: number;
  color: string;
  variant?: keyof typeof variant;
  style?: React.CSSProperties;
  className?: string;
}

const variant = {
  primary: "primary",
  secondary: "secondary",
} as const;

/** MEMO: forwardRef를 사용하면, 상위 컴포넌트에서 ref를 사용할 수 있게 함 */
const Icon = forwardRef<HTMLElement, IconProps>(
  (
    {
      name,
      size = 20,
      color = "black",
      variant = "primary",
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const svgPath = `/images/svgs/${name}.svg`;
    const svgStyle = { color, ...style };
    return (
      <SVG
        innerRef={ref as React.Ref<SVGElement>}
        src={svgPath}
        width={`${size}px`}
        height={`${size}px`}
        style={svgStyle}
        {...rest}
      />
    );
  }
);

export default Icon;
