import Portfolio from '../../types/portfolio';


interface SkillsCardProps {
  portfolio: Portfolio;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import '../skills/skillsCard.scss'

const PortfolioCard = ({ portfolio, editBtn, deleteBtn }: SkillsCardProps,) => {

  // console.log(portfolio);
  

  return (
    <div className="card">
      <div className="user__box text-center">
        <img className='portfolio_img' src={`https://ap-portfolio-backend.up.railway.app/upload/${portfolio.photo._id}.${portfolio.photo.name.split(".")[1]}`} alt="" />
        <div className=' z-2'>
          <h3 className="user__name">Name: {portfolio.name}</h3>
          <p className="user__text my-3">Url: <a className='text-warning fw-bold' href={portfolio.url} target='blank'>{portfolio.name}</a></p>
          <p className="user__text">Description: {portfolio.description}</p>
        </div>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn z-2">
        <button className="btn btn-info" onClick={() => editBtn(portfolio._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(portfolio._id)}>Delete</button>
      </div>
    </div>
  )
}

export default PortfolioCard