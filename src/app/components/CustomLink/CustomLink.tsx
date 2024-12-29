import Link from "next/link";
import type { FC } from "react";
import styles from "./CustomLink.module.scss";
interface LinkProps {
  children: React.ReactNode;
  href: string;
}

const CustomLink: FC<LinkProps> = ({ children, href }) => {
  return (
    <Link href={href} className={styles.customLink}>
      {children}
    </Link>
  );
};
export default CustomLink;
