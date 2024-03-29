interface User {
  role: string;
  fields: string[];
  client: boolean;
  _id: string;
  photo:  {
    _id: string;
    name: string;
  };
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  createdAt: string;
}

export default User;
