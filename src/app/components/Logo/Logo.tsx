"use client";
import Image from "next/image";
import styles from "./logo.module.scss";
import Link from "next/link";
const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <p>Acme Co.</p>
      <Link href="tel:108-177-7056" className={styles.linkTel}>
        108-177-7056
      </Link>
      <Link href="http://www.warephase.com" className={styles.link}>
        http://www.warephase.com
      </Link>
    </div>
  );
};

export default Logo;
