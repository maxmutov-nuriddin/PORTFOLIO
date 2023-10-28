import User from "./user";

interface Education {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: number;
  endDate: number;
  user: User;
  __v: number;
}

export default Education;