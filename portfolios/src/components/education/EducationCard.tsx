import Education from "../../types/education";

interface EducationCardProps {
  education: Education;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import '../skills/skillsCard.scss'

const EducationCard = ({ education, editBtn, deleteBtn }: EducationCardProps,) => {
  return (
    <div className="card">
      <div className="user__box">
        <h3 className="user__name">Name: {education.name}</h3>
        <p className="user__text">Level: {education.level}</p>
        <p className="user__text">Description: {education.description}</p>
        <p className="user__text">StartDate: {education.startDate.split('T')[0]}</p>
        <p className="user__text">EndDate: {education.endDate.split('T')[0]}</p>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn">
        <button className="btn btn-info" onClick={() => editBtn(education._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(education._id)}>Delete</button>
      </div>
    </div>
  )
}

export default EducationCard