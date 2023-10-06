import {
  ReactNode,
  createContext,
  useContext,
  // useReducer,
  useState,
} from "react";
// import axios from "axios";

/**
 * 1. 创建Context
 * 2. 定义reducer func
 * 3. 定义初始state
 * 4. 创建Provider
 * 5. 创建Consumer
 */

interface UserState {
  name: string;
  email: string;
  user_role: number;
}

interface LoginState {
  user: UserState | null;
  accessToken: string;
  setAccessToken: (token: string) => void;
  setCurrentUser: (user: UserState | null) => void;
}

const initialState = {
  user: null,
  accessToken: "",
};

// (1) create Context
const AuthContext = createContext<LoginState>(initialState);

// 3. 创建Provider
interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState<UserState | null>(null);

  // 对外暴露set的能力
  function setNewAccessToken(token: string) {
    setAccessToken(token);
  }

  function setNewCurrentUser(user: UserState | null) {
    setCurrentUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user: currentUser,
        setAccessToken: setNewAccessToken,
        setCurrentUser: setNewCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  // 对外暴露hook 而不是 context
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
}

export { useAuth, AuthProvider };
