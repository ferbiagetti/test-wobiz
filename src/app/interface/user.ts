export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  'token': string;
  'expires': number;
  'user_id': number;
}
