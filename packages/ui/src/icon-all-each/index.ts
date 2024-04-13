import svgIcon from "../grafana-icons/Icon";
import { createElement, memo } from "react";

const IconName = ["plus"];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

IconName.forEach((name) => {
  const componentName = `${capitalize(name)}Icon`;
  module.exports[componentName] = memo((props) =>
    createElement(svgIcon, { name, size: 32, color: "red", ...props })
  );
});
