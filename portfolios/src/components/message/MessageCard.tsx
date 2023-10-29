import Message from "../../types/message";

interface MessageCardProps {
  message: Message;
  editBtn: (id: string) => void;
  deleteBtn: (id: string) => void;
}

import '../skills/skillsCard.scss'

const MessageCard = ({ message, editBtn, deleteBtn }: MessageCardProps,) => {

  return (
    <div className="card">
      <div className="user__box">
        <h3 className="user__name">Name: {message.title}</h3>
        <p className="user__text">Message: {message.message}</p>
        <p className="user__text">Answer: {message.answer}</p>
        <p className="user__text">User: {message.whom === null ? 'Anonim' : message.whom.firstName}</p>
        <p className="user__text">Phone: {message.user}</p>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <div className="all__btn">
        <button className="btn btn-info" onClick={() => editBtn(message._id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => deleteBtn(message._id)}>Delete</button>
      </div>
    </div>
  )
}

export default MessageCard