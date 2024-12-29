"use client";
import { useRouter } from "next/navigation";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import styles from "./Header.module.scss";
interface Props {
  children: React.ReactNode;
  isBackButtonVisible?: boolean;
}
const Header = ({ children, isBackButtonVisible = false }: Props) => {
  const router = useRouter();

  const handelBeckButton = () => {
    router.back();
  };

  return (
    <header className={styles.header}>
      {isBackButtonVisible && (
        <button className={styles.button} onClick={handelBeckButton}>
          <SpriteSVG href="icon-arrow-back" color="#000000" /> Back
        </button>
      )}

      <span>{children}</span>
    </header>
  );
};

export default Header;
