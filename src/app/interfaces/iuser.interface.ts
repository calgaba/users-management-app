export interface IUser {
  id: number;
  _id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
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
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

