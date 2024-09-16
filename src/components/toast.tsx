import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ToastProps {
  duration?: number;
}

export const Toast: FC<PropsWithChildren<ToastProps>> = ({
  duration = 4000,
  children,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return;

  return createPortal(
    <div className="toast toast-top toast-end">{children}</div>,
    document.body,
  );
};
