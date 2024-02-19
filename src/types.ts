export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface ApiResponse {
  statusCode: number;
  body: any;
}

export interface GetUserByIdQuery {
  userId: string;
}

export interface CreateUserRequestBody {
  username: string;
  age: number;
  hobbies?: string[];
}

export interface UpdateUserRequestBody {
  username?: string;
  age?: number;
  hobbies?: string[];
}

export interface UpdateUserQuery {
  userId: string;
}

export interface DeleteUserQuery {
  userId: string;
}
