import type { FC } from "react";
import styles from "./MessageBlock.module.scss";
interface MessageBlockProps {
  children: React.ReactNode;
}

const MessageBlock: FC<MessageBlockProps> = ({ children }) => {
  return (
    <>
      <p className={styles.text}>
        <span className={styles.asterisk}>*</span>
        {children}
      </p>
    </>
  );
};
export default MessageBlock;
