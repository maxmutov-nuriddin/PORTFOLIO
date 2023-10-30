import { Col } from "react-bootstrap";

interface Project {
  name: string;
  description: string;
  photo: {
    _id: string;
    name: string;
  };
  url: URL;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

  return (
    <Col xs={12} sm={6} md={3}>
      <a href={`${project.url}`} target="_blank" className="text-light">
        <div className="proj-imgbx">
          <img
            className="proj-imgbx-img"
            src={
              project.photo.name.split(".")[1] === "jpg" ||
                project.photo.name.split(".")[1] === "png"
                ? `https://ap-portfolio-backend.up.railway.app/upload/${project.photo._id}.${project.photo.name.split(".")[1]}`
                : "../../../public/Gold Luxury Business Logo.png"
            }
          />
          <div className="proj-txtx">
            <h4>{project.name}</h4>
            <span>{project.description}</span>
          </div>
        </div>
      </a>
    </Col>
  );
};

export default ProjectCard;