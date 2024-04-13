import svgIcon from "../icon-all-each/svgIcon";
import { createElement } from "react";

// TODO: get Folder Icon
const IconName = ["plus"];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

for (const icon of IconName) {
  const name = `${capitalize(icon)}Icon`;
  module.exports[name] = (props) =>
    createElement(svgIcon, { icon: "plus", size: 32, color: "red", ...props });
}
