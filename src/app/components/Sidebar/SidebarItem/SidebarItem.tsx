"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./SidebarItem.module.scss";
export interface SidebarItemProps {
  current?: boolean;
  pathname: string;

  title: string;
  children?: React.ReactNode;
}

export default function SidebarItem({
  current,
  pathname,
  title,
  children,
}: SidebarItemProps) {
  return (
    <li className={styles.list}>
      <Link
        href={pathname}
        className={clsx(styles.link, { [styles.current]: current })}
      >
        {children}

        <span>{title}</span>
      </Link>
    </li>
  );
}
