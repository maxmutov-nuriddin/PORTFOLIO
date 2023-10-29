import User from '../../types/user';

import '../skills/skillsCard.scss'

interface SkillsCardProps {
  users: User;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

const UserCard = ({ users, editBtn, deleteBtn }: SkillsCardProps,) => {



  return (
    <div className="card">
      <div className="user__box text-center">
        <img className='portfolio_img' src={`https://ap-portfolio-backend.up.railway.app/upload/${users.photo}`} alt="" />
        <div className=' z-2'>
          <h3 className="user__name">Name: {users.firstName} {users.lastName}</h3>
          <p className="user__name">Username: {users.username}</p>
          <p className="user__name">Username: {users.role}</p>
          <p className="user__name">Client: {users.client ? 'Not client' : 'Client'}</p>
        </div>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn z-2">
        <button className="btn btn-info" onClick={() => editBtn(users._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(users._id)}>Delete</button>
      </div>
    </div>
  )
}

export default UserCard