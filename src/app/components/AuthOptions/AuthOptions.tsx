import styles from "./AuthOptions.module.scss";

const AuthOptions = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapButton}>
      <p>Already have an account? </p>
      {children}
    </div>
  );
};
export default AuthOptions;
