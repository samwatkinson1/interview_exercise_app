import { FC, PropsWithChildren } from "react";

export interface AlertProps {
  type: "info" | "error";
}

export const Alert: FC<PropsWithChildren<AlertProps>> = ({
  type,
  children,
}) => {
  return (
    <div role="alert" className={`alert ${type === "error" && "alert-error"}`}>
      <span>{children}</span>
    </div>
  );
};
