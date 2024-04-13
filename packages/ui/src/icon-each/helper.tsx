import React, {
  HTMLAttributes,
  ReactElement,
  createContext,
  useContext,
  useMemo,
} from "react";

// Theme를 구분함
export type Theme = "outline" | "filled";

export interface ISvgIconProps {
  id: string;
  size: number | string; // icon size
  strokeWidth: number;
  colors: string[]; // icon color, fill, stroke의 색상을 지정함
}

export interface IIconConfig {
  size: number | string;
  strokeWidth: number;
  prefix: string;
  theme: Theme;
  colors: {
    outline: {
      fill: string;
      background: string;
    };
    filled: {
      fill: string;
      background: string;
    };
  };
}

export interface IIconBase {
  size?: number | string;
  strokeWidth?: number;
  theme?: Theme;
  fill?: string | string[];
}

export type Intersection<T, K> = T & Omit<K, keyof T>;

export type IIconProps = Intersection<
  IIconBase,
  HTMLAttributes<HTMLSpanElement>
>;

export type IconRender = (props: ISvgIconProps) => ReactElement;

export type Icon = (props: IIconProps) => ReactElement;

export const DEFAULT_ICON_CONFIGS: IIconConfig = {
  size: "12px",
  strokeWidth: 4,
  theme: "outline",
  colors: {
    outline: {
      fill: "#333",
      background: "transparent",
    },
    filled: {
      fill: "#333",
      background: "#FFF",
    },
  },
  prefix: "i", // 아이콘의 클래스명을 지정함
};

function guid(): string {
  const id = (((1 + Math.random()) * 0x100000000) | 0).toString(16);
  return (`icon-${id}`);
}

export function IconConverter(
  id: string,
  icon: IIconBase,
  config: IIconConfig
): ISvgIconProps {
  const fill = typeof icon.fill === "string" ? [icon.fill] : icon.fill || [];
  const colors: string[] = [];

  const theme: Theme = icon.theme || config.theme;

  switch (theme) {
    case "outline":
      colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
      colors.push("none");
      colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
      colors.push("none");
      break;
    case "filled":
      colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
      colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
      colors.push("#FFF");
      colors.push("#FFF");
      break;
  }

  return {
    size: icon.size || config.size,
    strokeWidth: icon.strokeWidth || config.strokeWidth,
    colors,
    id,
  };
}

// Icon의 기본 설정을 저장함 - Context는 상태를 저장함 - provider는 상태를 제공함 - app단에 선언해 전역으로 사용함
const IconContext = createContext(DEFAULT_ICON_CONFIGS);
export const IconProvider = IconContext.Provider;

export function IconWrapper(name: string, render: IconRender): Icon {
  return (props: IIconProps) => {
    const { size, strokeWidth, theme, fill, className, ...extra } = props;

    const ICON_CONFIGS = useContext(IconContext);

    const id = useMemo(guid, []);

    const svgProps = IconConverter(
      id,
      {
        size,
        strokeWidth,
        theme,
        fill,
      },
      ICON_CONFIGS
    );

    const cls: string[] = [ICON_CONFIGS.prefix + "-icon"];

    cls.push(ICON_CONFIGS.prefix + "-icon" + "-" + name);

    if (className) {
      cls.push(className);
    }

    return (
      <span {...extra} className={cls.join(" ")}>
        {render(svgProps)}
      </span>
    );
  };
}
