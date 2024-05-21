export interface IUser {
  staff_id?: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  age: number;
  password: string;
  date_created: Date | string;
  email: string;
  gender: string;
  role: string;
  active: boolean;
}
