import { FormEvent, useState } from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError(null);
      const result = await signIn("external-user", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
  };

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
          {status === "loading" ? (
            <p>Carregando...</p>
          ) : session ? (
            <div className={styles.loggedContent}>
              <h1>Welcome!</h1>
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
              <button
                className={styles.primary}
                onClick={handleSignOut}
                disabled={isLoading}
              >
                {isLoading ? "Saindo..." : "Sair"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <h1>Login</h1>
              {error && <div className={styles.errorMessage}>{error}</div>}
              <div className={styles.formGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.primary}
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          )}
        </main>
      </div>
    </>
  );
}
