import Banner from "../../components/portfolioPage/Banner";
import Skills from "../../components/portfolioPage/Skills";
import NavBar from "../../components/portfolioPage/NavBar";
import Projects from "../../components/portfolioPage/Project";
import Expirien from "../../components/portfolioPage/Expirien";
import Educations from "../../components/portfolioPage/Educations";
import Messages from "../../components/portfolioPage/Messages";


import "../../components/portfolioPage/profile.scss";

const ProfilePage = () => {

  return (
    <div className="container">
      <div className="container__profile">
        <NavBar />
        <Banner />
        <Skills />
        <Projects />
        <Expirien />
        <Educations />
        <Messages />
      </div>
    </div>
  );
};

export default ProfilePage;