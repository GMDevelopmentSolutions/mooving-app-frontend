import type { FC } from "react";
import styles from "./H5.module.scss";
interface H5Props {
  children: React.ReactNode;
}

const H5: FC<H5Props> = ({ children }) => {
  return <h5 className={styles.h5}>{children}</h5>;
};
export default H5;
