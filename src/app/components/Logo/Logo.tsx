"use client";
import Image from "next/image";
import styles from "./logo.module.scss";
import Link from "next/link";
const Logo = () => {
	const acmeCoName = process.env.NEXT_PUBLIC_ACME_CO_NAME;
	const acmeCoLink = process.env.NEXT_PUBLIC_ACME_CO_LINK;
	const acmeCoPhone = process.env.NEXT_PUBLIC_ACME_CO_PHONE;
	const acmeCoPhoneLink = process.env.NEXT_PUBLIC_ACME_CO_PHONE_LINK;

	return (
		<div className={styles.logo}>
			<Image src="/logo.png" alt="logo" width={100} height={100} />
			<p>{acmeCoName}</p>
			<Link href={`${acmeCoPhoneLink}`} className={styles.linkTel}>
				{acmeCoPhone}
			</Link>
			<Link href={`${acmeCoLink}`} className={styles.link}>
				{acmeCoLink}
			</Link>
		</div>
	);
};

export default Logo;
