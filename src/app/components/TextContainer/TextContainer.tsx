import type { FC } from "react";
import styles from "./TextContainer.module.scss";

interface TextContainerProps {
  title: string;
  text: string;
}

const TextContainer: FC<TextContainerProps> = ({ title, text }) => {
  return (
    <div className={styles.textContainer}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};
export default TextContainer;
