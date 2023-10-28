import Skill from "../../types/skill";

interface SkillsCardProps {
  skills: Skill;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import './skillsCard.scss'

const SkillsCadr = ({ skills, editBtn, deleteBtn }: SkillsCardProps,) => {

  
  return (
    <div className="card">
      <div className="user__box">
        <h3 className="user__name">Name: {skills.name}</h3>
        <p className="user__text">Present: {skills.percent}</p>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn">
        <button className="btn btn-info" onClick={() => editBtn(skills._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(skills._id)}>Delete</button>
      </div>
    </div>
  )
}

export default SkillsCadr