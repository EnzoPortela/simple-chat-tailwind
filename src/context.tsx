import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  sessionId: string | undefined;
}

const sfCall = "sfSendValue";

export const AuthContext = createContext<IAuthContext>({
  sessionId: undefined,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string>();

  const handleMessageEvent = useCallback((event: MessageEvent) => {
    const { call, value } = event.data;
    if (call === sfCall) {
      const splitValue = (value as string).split(";");
      setSessionId(splitValue[2]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [handleMessageEvent]);

  return (
    <AuthContext.Provider
      value={{
        sessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
