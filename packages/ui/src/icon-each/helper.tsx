import React, {
  HTMLAttributes,
  ReactElement,
  createContext,
  useContext,
  useMemo,
} from "react";

export interface ISvgIconProps {
  id: string;
  size: number | string; 
  strokeWidth: number;
  colors: string[]; 
}

export interface IIconConfig {
  size: number | string;
  strokeWidth: number;
  prefix: string;
  colors: {
    fill: string;
    background: string;
  };
}

export interface IIconBase {
  size?: number | string;
  strokeWidth?: number;
  fill?: string | string[];
}

export type Intersection<T, K> = T & Omit<K, keyof T>;

export type IIconProps = Intersection<
  IIconBase,
  HTMLAttributes<HTMLSpanElement>
>;

interface IIconClasses {
  prefix: string;
  name: string;
  className?: string;
}

export type IconRender = (props: ISvgIconProps) => ReactElement;

export type Icon = (props: IIconProps) => ReactElement;

export const DEFAULT_ICON_CONFIGS: IIconConfig = {
  size: "12px",
  strokeWidth: 2,
  colors: { fill: "#333", background: "transparent" },
  prefix: "i",
};


// Icon의 기본 설정을 저장함 - Context는 상태를 저장함 - provider는 상태를 제공함 - app단에 선언해 전역으로 사용함
const IconContext = createContext(DEFAULT_ICON_CONFIGS);
export const IconProvider = IconContext.Provider;

export function IconWrapper(name: string, render: IconRender): Icon {
  return (props: IIconProps) => {
    const { size, strokeWidth, fill, className, ...extra } = props;

    const ICON_CONFIGS = useContext(IconContext);
    const id = useMemo(guid, []);

    const svgProps = generateSvgProps( id,  { size,  strokeWidth,  fill, }, ICON_CONFIGS );
    const cls= getClasses({ prefix: ICON_CONFIGS.prefix, name, className });

    return (
      <span {...extra} className={cls}>
        {render(svgProps)}
      </span>
    );
  };
}

function guid(): string {
  const id = (((1 + Math.random()) * 0x100000000) | 0).toString(16);
  return (`icon-${id}`);
}

function generateSvgProps(
  id: string,
  icon: IIconBase,
  config: IIconConfig
): ISvgIconProps {
  const fill = typeof icon.fill === "string" ? [icon.fill] : icon.fill || [];
  const colors = [
    fill[0] || config.colors.fill,
    fill[1] || config.colors.background,
  ]
  return {
    size: icon.size || config.size,
    strokeWidth: icon.strokeWidth || config.strokeWidth,
    colors,
    id,
  };
}

function getClasses({ prefix, name, className }: IIconClasses) {
  const classes: string[] = [`${prefix}-icon`];
  classes.push(`${prefix}-icon-${name}` );
  if (className)  classes.push(className);

  return classes.join(" ");
}