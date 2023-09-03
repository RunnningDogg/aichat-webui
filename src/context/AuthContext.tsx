import { createContext, useContext, useReducer, ReactNode } from "react";
import axios from "axios";
/**
 * 1. 创建Context
 * 2. 定义reducer func
 * 3. 定义初始state
 * 4. 创建Provider
 * 5. 创建Consumer
 */

interface LoginState {
  user: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  login: (name: string, password: string) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

// (1) create Context
const AuthContext = createContext<LoginState>(initialState);

// 定义reducer func
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const FAKE_USER = {
  name: "tony",
  email: "tony@163.com",
  password: "123456",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// 3. 创建Provider
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(name: string, password: string) {
    console.log(name, password);
    axios.get("api/users").then((res) => {
      console.log(res.data);
      res.data.map((data) => {
        if (data.name === name && data.password === password) {
          dispatch({
            type: "LOGIN",
            payload: data,
          });
        }
      });
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
