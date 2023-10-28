import Expiriens from "../../types/expiriens";

interface ExpiriensCardProps {
  expiriens: Expiriens;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import '../skills/skillsCard.scss'

const ExpiriensCard = ({ expiriens, editBtn, deleteBtn }: ExpiriensCardProps,) => {
  return (
    <div className="card">
      <div className="user__box">
        <h3 className="user__name">Name: {expiriens.workName}</h3>
        <p className="user__text">Level: {expiriens.companyName}</p>
        <p className="user__text">Description: {expiriens.description}</p>
        <p className="user__text">StartDate: {expiriens.startDate.split('T')[0]}</p>
        <p className="user__text">EndDate: {expiriens.endDate.split('T')[0]}</p>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn">
        <button className="btn btn-info" onClick={() => editBtn(expiriens._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(expiriens._id)}>Delete</button>
      </div>
    </div>
  )
}

export default ExpiriensCard