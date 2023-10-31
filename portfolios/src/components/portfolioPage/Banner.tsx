import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import request from "../../server";

const Banner = () => {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formDatas, setFormDatas] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await request("auth/me");
        setFormDatas(response.data)
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  console.log(formDatas.birthday);
  

  return (
    <section className="banner" id="home">
      <Row className="aligh-items-center">
        <Col xs={12} md={6} xl={7}>
          <>
            <div className="animate__animated animate__fadeIn ">
              <span className="tagline">Welcome to my Portfolio</span>
              <h1 className="titles">
                {`Hi! I'm ${formDatas?.firstName}`}.
                <span className="wrap"> {formDatas?.info}</span>
              </h1>
              <p>
                My name is {formDatas?.firstName} {formDatas?.lastName}. I was born on{" "}
                {formDatas?.birthday === null ? "" : formDatas?.birthday.split("T")[0]}. Currently, I work as an{" "}
                {formDatas?.role}. I love my job, and I like to say: {formDatas?.info}. It always brings a surprise to
                people's faces!
              </p>
            </div>
          </>
        </Col>
        <Col xs={12} md={6} xl={5}>
          <>
            <div className="animate__animated animate__zoomIn">
              <img className="animate__animated-img" src={`https://ap-portfolio-backend.up.railway.app/upload/${formDatas?.photo}`} alt="Header Img" />
            </div>
          </>
        </Col>
      </Row>
    </section>
  );
};

export default Banner;