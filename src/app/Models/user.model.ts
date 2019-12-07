export interface UserModel {
  _id?: string;
  name: string;
  role?: string;
  lastName: string;
  username: string;
  password?: string;
  verified?: boolean;
}
