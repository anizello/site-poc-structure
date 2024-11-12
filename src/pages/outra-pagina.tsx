import Head from "next/head";
import { useSession } from "next-auth/react";

import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Login | My App</title>
        <meta name="description" content="Login to access your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <Header />

          {status === "loading" ? (
            <p>Skeleton Bonito</p>
          ) : (
            session && (
              <div className={styles.loggedContent}>
                <h1>Outra Página</h1>
                <div className={styles.userInfo}>
                  <p>
                    <strong>Email:</strong> {session.user?.email}
                  </p>
                  <p>
                    <strong>ID:</strong> {session.user?.id}
                  </p>
                  <p>
                    <strong>Roles:</strong>{" "}
                    {session.user?.roles?.length
                      ? session.user.roles.join(", ")
                      : "Sem roles"}
                  </p>
                  <p>
                    <strong>Sessão expira em:</strong> {session.expires}
                  </p>
                </div>
              </div>
            )
          )}
        </main>
      </div>
    </>
  );
}
