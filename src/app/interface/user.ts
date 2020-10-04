export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  'codigo': number;
  'token': string;
  'expires': number;
  'user_id': string;
}
