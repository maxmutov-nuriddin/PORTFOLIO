import User from "./user";

interface Education {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: User;
  __v: number;
}

export default Education;