import React from "react";
import Styles from "./SlideActionsBtn.module.scss";

const SlideActionsBtn: React.FC<{
  title: string;
  bgColor: string;
  padding: string;
  borderRadius?: string;
  Icon?: any;
  width?: string;
  actions: Function;
  type?: any;
  color?: string;
}> = ({
  title,
  bgColor,
  borderRadius,
  Icon,
  padding,
  actions,
  width,
  color,
  type = "button",
}) => {
  const style = {
    backgroundColor: bgColor,
    padding: padding,
    width: width,
    borderRadius: borderRadius,
    color: color,
  };
  return (
    <button
      type={type}
      style={style}
      className={Styles.deletBtn}
      onClick={() => actions()}
    >
      <span>
        {Icon && (
          <span className={Styles.icon}>
            <Icon />
          </span>
        )}
        <span>{title}</span>
      </span>
    </button>
  );
};

export default SlideActionsBtn;
