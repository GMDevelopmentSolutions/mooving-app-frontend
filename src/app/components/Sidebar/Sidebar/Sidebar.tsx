"use client";
import styles from "./Sidebar.module.scss";
import Logo from "../../Logo/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "../SidebarItem/SidebarItem";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Logout from "../../Logout/Logout";

const Sidebar = ({}) => {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState("");

	const path = pathname.split("/")[1];
	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	const handelBeckButton = () => {
		router.back();
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (path === "editprofile") setCurrentPage("Edit profile");
		if (path === "status") setCurrentPage("Status of applications/orders");
		if (path === "order") setCurrentPage("Create a request/ order");
		if (path === "inventor") setCurrentPage("Inventor management");
	}, [path]);

	const acmeCoPhone = process.env.NEXT_PUBLIC_ACME_CO_PHONE;
	const acmeCoPhoneLink = process.env.NEXT_PUBLIC_ACME_CO_PHONE_LINK;
	const acmeCoInfo = process.env.NEXT_PUBLIC_ACME_CO_INFO;
	const acmeCoAddress = process.env.NEXT_PUBLIC_ACME_CO_TEXT;

	return (
		<aside className={styles.aside} ref={sidebarRef}>
			<div className={styles.sideContainer}>
				{path === "inventor" && (
					<button className={styles.buttonBack} onClick={handelBeckButton}>
						<SpriteSVG href="icon-arrow" color="#000000" /> Back
					</button>
				)}
				<span className={styles.currentPage}>{currentPage}</span>
				<button className={styles.btnOpenMenu} onClick={handleClick}>
					<span></span>
				</button>
			</div>
			<div className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
				<Logo />
				<Link
					href="/editprofile"
					className={clsx(styles.linkEdit, {
						[styles.current]: path === "editprofile",
					})}
				>
					<SpriteSVG href="icon-Component" />
					<p>Edit profile</p>
				</Link>
				<ul className={styles.list}>
					<SidebarItem
						current={path === "status"}
						pathname="/status"
						title="Status of applications/orders"
					>
						<SpriteSVG href="icon-list" />
					</SidebarItem>
					<SidebarItem
						current={path === "order"}
						pathname="/order"
						title="Create a request/ order"
					>
						<SpriteSVG href="icon-dashboard" />
					</SidebarItem>
					<SidebarItem
						current={path === "inventor"}
						pathname="/inventor"
						title="My inventory"
					>
						<SpriteSVG href="icon-cube" />
					</SidebarItem>
				</ul>
				<div className={styles.wrapFooter}>
					<Link href={`${acmeCoPhoneLink}`} className={styles.linkTel}>
						<span>{acmeCoInfo}</span>
						{acmeCoPhone}
					</Link>
					<div className={styles.linkLogout}>
						<Logout />
					</div>

					<Link href="#" className={styles.linkLicense}>
						{acmeCoAddress}
					</Link>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
