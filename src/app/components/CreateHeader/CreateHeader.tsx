import styles from "./CreateHeader.module.scss";

interface Props {
  children: React.ReactNode;
}

const CreateHeader = ({ children }: Props = { children: null }) => {
  return <header className={styles.header}>{children}</header>;
};

export default CreateHeader;
