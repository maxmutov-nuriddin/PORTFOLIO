import Banner from "../../components/portfolioPage/Banner";
import Skills from "../../components/portfolioPage/Skills";
import NavBar from "../../components/portfolioPage/NavBar";


import "../../components/portfolioPage/profile.scss";

const ProfilePage = () => {

  return (
    <div className="container">
      <div className="container__profile">
        <NavBar />
        <Banner />
        <Skills />
      </div>
    </div>
  );
};

export default ProfilePage;