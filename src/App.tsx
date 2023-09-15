import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import Error from "./pages/Error";
import Knowledges from "./pages/Knowledges";
import UploadPage from "./pages/upload/Uploadpage";
import HomePage2 from "./pages/HomePage2";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#597ef7",
            borderRadius: 5,
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage2 />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="c" element={<Chat />}>
              <Route path=":id" element={<Chat />} />
            </Route>
            <Route path="knowledge" element={<Knowledges />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
