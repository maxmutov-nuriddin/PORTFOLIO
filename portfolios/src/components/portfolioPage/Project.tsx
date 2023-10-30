import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import request from "../../server";
import TrackVisibility from 'react-on-screen';
import ProjectCards from "./ProjectCards"

interface Project {
  name: string;
  description: string;
  photo: {
    _id: string;
    name: string;
  };
  _id: string;
  url: URL;
}

const Projects = () => {
  const userId = localStorage.getItem("PORTFOLIO_USER")
    ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
    : null;
    

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setFormDatas] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await request(`portfolios?user=${userId._id}`);
        setFormDatas(response.data.data)
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


  return (
    <section className="project" id="projects">
      <Container className="containers">
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="mb-5">Projects</h2>
                  <Row>
                    {
                      projects !== null ? (projects.map((project: Project) => {
                        return (
                          <ProjectCards
                            key={project._id}
                            project={project}
                          />
                        );
                      })) : (<div className="fs-3 text-center mt-5">Card not found</div>)
                    }
                  </Row>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Projects