import type { FC } from "react";
import styles from "./ProfileContainer.module.scss";
interface ProfileContainerProps {
  title: string;
  text: string;
}

const ProfileContainer: FC<ProfileContainerProps> = ({ title, text }) => {
  return (
    <div className={styles.profileContainer}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};
export default ProfileContainer;
