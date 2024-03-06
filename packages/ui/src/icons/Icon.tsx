import { forwardRef } from "react";
import { css, cx } from "@emotion/css";
import SVG from 'react-inlinesvg';

interface IconProps {
  icon: string;
  size: Size;
  color: string;
  variant: keyof typeof variant;
  style: React.CSSProperties;
  className: string;
}

type Size = keyof typeof size;

const size = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

// TODO: 스타일 클래스를 정의해서, 아이콘의 색상을 변경할 수 있게 함
const variant = {
  primary: 'primary',
  secondary: 'secondary',
} as const;



/** MEMO: forwardRef를 사용하면, 상위 컴포넌트에서 ref를 사용할 수 있게 함 */
export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ icon, size = 'sm', color, variant = 'primary', style, className, ...rest }, ref) => {

    const iconStyle = css({
      icon: {
        fill: color || 'currentcolor',
        alignItems: 'center',
        justifyContent: 'center'
      },
    });
    const iconClassName = cx( iconStyle, className );
    const svgPath = `./svgs/${icon}.svg`;  // TODO: 경로 수정 - 경로에 파일 없을 때 에러 처리

    return (
      <SVG
        innerRef={ref as React.Ref<SVGElement>}
        src={svgPath}
        width={size}
        height={size}
        className={iconClassName}
        style={style}
        {...rest}
      />);
  }
);