import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { AuthProvider } from "./context/AuthContext";

import HomePageWithSideBar from "./pages/HomePageWithSideBar";

import Error from "./pages/Error";
import Knowledges from "./pages/Knowledges";
import UploadPage from "./pages/upload/Uploadpage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Chat from "./pages/ChatPage/Chat";
import Marked from "./pages/MarkdownPlayground/Marked";
function App() {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#597ef7",
            borderRadius: 5,
            colorLink: "#475569",
            colorLinkActive: "#597ef7",
            colorLinkHover: "#597ef7",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="sidebar" element={<HomePageWithSideBar />} />
              <Route path="marked" element={<Marked />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="c" element={<Chat />}>
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="knowledge" element={<Knowledges />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </StyleProvider>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
