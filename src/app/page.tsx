"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}
