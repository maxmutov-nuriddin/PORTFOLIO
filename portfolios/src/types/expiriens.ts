import User from "./user";

interface Expiriens {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  user: User;
  __v: number;
}

export default Expiriens;