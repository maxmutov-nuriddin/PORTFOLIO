import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalPage from './pages/GlobalPage'

import './App.scss'

import Layout from "./components/layout";

import Portfolio from "./pages/admin/Portfolio";
import Education from "./pages/admin/Education";
import Skills from "./pages/admin/Skills";
import Users from "./pages/admin/Users";
import Message from "./pages/admin/Message";

import ProfilePage from "./pages/user/ProfilePage";
import SettingPage from "./pages/user/SettingPage";
import LoginPage from "./pages/admin/Login";
import useAuth from "./store/auth";
import AccountPge from "./pages/user/AccountPge";
import NoutFound from "./pages/public/NoutFound";
import ClientPage from "./pages/user/ClientPage";


function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route
            path="/"
            element={
              isAuthenticated && user?.role === 'admin' ? (
                <Layout />
              ) : isAuthenticated ? (
                <ClientPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/" element={<GlobalPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/users" element={<Users />} />
            <Route path="/message" element={<Message />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<AccountPge />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoutFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;