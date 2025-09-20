export interface IUser {
  id: number;
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface IUsersPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
}

export interface IUserDto {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

