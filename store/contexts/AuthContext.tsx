import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { Session } from "next-auth";

interface AuthContextProps {
  user: Session["user"] | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Session["user"] | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturumu bilgilerini buradan yükleyebiliriz
    const loadUser = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const session = await response.json();
        setUser(session?.user || null);
      }
    };

    loadUser();
  }, []);

  const signOut = async () => {
    // Oturumu kapat ve ardından belirtilen URL'ye yönlendir
    await nextAuthSignOut({ redirect: false });
    setUser(null);
    router.push(process.env.NEXTAUTH_URL || "/");
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
