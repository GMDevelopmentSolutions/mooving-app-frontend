import React from "react";
import styles from "./Wrapper.module.scss";
import { IWrapperProps } from "@/interface/interface";

const Wrapper: React.FC<IWrapperProps> = ({
  children,
  background,
  paddingTop,
  maxWidth,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ background, paddingTop, maxWidth }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
