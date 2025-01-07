import React, { ReactNode } from "react";
import cx from "@/lib/cx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClass?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <button
        type="button"
        className={cx(" inline-flex flex-row items-center", props.className)}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.leftIcon && <span className="mr-2">{props.leftIcon}</span>}
        <span className={cx(props.textClass)}>{props.children}</span>
        {props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
