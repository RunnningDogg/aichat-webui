import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import Marked from "./pages/MarkdownPlayground/MarkedWithCode";
import Demo from "./pages/Demo";
import MarkedChat from "./pages/MarkdownPlayground/MarkedChat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="sidebar" element={<HomePageWithSideBar />} />
                <Route path="marked" element={<Marked />} />
                <Route path="markedpage" element={<MarkedChat />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="c" element={<Chat />}>
                  <Route path=":id" element={<Chat />} />
                </Route>
                <Route path="knowledge" element={<Knowledges />} />
                <Route path="login" element={<Login />} />
                <Route path="demo" element={<Demo />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </StyleProvider>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
