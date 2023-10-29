import User from "./user";

interface Message {
  _id: string;
  answer: string;
  show: boolean;
  title: string;
  whom: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  message: string;
  users: User;
  user: string;
  __v: number;
}

export default Message;