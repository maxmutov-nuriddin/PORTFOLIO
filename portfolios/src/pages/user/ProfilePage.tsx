import Banner from "../../components/portfolioPage/Banner";
import NavBar from "../../components/portfolioPage/NavBar";
import Projects from "../../components/portfolioPage/Project";
import Expirien from "../../components/portfolioPage/Expirien";
import Educations from "../../components/portfolioPage/Educations";
import Messages from "../../components/portfolioPage/Messages";
import Footer from "../../components/portfolioPage/Footer";


import "../../components/portfolioPage/profile.scss";
import SkillSection from "../../components/portfolioPage/SkillSection";
import { FloatButton } from "antd";

const ProfilePage = () => {

  return (
    <div className="container">
      <div className="container__profile">
        <NavBar />
        <Banner />
        <SkillSection />
        <Projects />
        <Educations />
        <Messages />
        <Expirien />
        <Footer />
        <FloatButton.BackTop />
      </div>
    </div>
  );
};

export default ProfilePage;