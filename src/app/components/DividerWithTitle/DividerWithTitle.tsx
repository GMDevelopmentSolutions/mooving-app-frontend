import type { FC } from "react";
import styles from "./DividerWithTitle.module.scss";
interface DividerWithTitleProps {
  title?: string;
}

const DividerWithTitle: FC<DividerWithTitleProps> = ({ title }) => {
  return <span className={styles.title}>{title}</span>;
};
export default DividerWithTitle;
