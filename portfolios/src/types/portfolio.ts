import User from "./user";

interface Portfolio {
  _id: string;
  name: string;
  url: string;
  description: string;
  user: User;
  __v: 0;
}

export default Portfolio;
