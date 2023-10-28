import Portfolio from '../../types/portfolio';


interface SkillsCardProps {
  portfolio: Portfolio;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import '../skills/skillsCard.scss'

const PortfolioCard = ({ portfolio, editBtn, deleteBtn }: SkillsCardProps,) => {

  return (
    <div className="card">
      <div className="user__box">
        <h3 className="user__name">Name: {portfolio.name}</h3>
        <p className="user__text">Url: {portfolio.url}</p>
        <p className="user__text">Description: {portfolio.description}</p>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn">
        <button className="btn btn-info" onClick={() => editBtn(portfolio._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(portfolio._id)}>Delete</button>
      </div>
    </div>
  )
}

export default PortfolioCard