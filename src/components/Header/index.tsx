import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { isLoading, isAuthenticated, user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={120}
          height={30}
          priority
        />
      </div>

      <button
        className={`${styles.authButton} ${isLoading ? styles.loading : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className={styles.skeleton} />
        ) : isAuthenticated ? (
          user?.name
        ) : (
          "Entrar"
        )}
      </button>
    </header>
  );
}
