import {
  User,
  ApiResponse,
  GetUserByIdQuery,
  UpdateUserQuery,
  DeleteUserQuery,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import http from "http";
import { getRequestBody, isValidUuid } from "../utils";

let users: User[] = [];

export async function getUsers(): Promise<ApiResponse> {
  return {
    statusCode: 200,
    body: users,
  };
}

export async function createUser(
  req: http.IncomingMessage
): Promise<ApiResponse> {
  try {
    const { username, age, hobbies } = await getRequestBody(req);
    if (!username || !age) {
      return {
        statusCode: 400,
        body: { error: "username and age are required" },
      };
    }
    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };
    users.push(newUser);
    return {
      statusCode: 201,
      body: newUser,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: "Internal server error" },
    };
  }
}

export async function updateUser(
  query: UpdateUserQuery,
  req: http.IncomingMessage
): Promise<ApiResponse> {
  try {
    const { userId } = query;
    if (!userId || !isValidUuid(userId)) {
      return {
        statusCode: 400,
        body: { error: "Invalid userId" },
      };
    }
    const existingUser = users.find((user) => user.id === userId);
    if (!existingUser) {
      return {
        statusCode: 404,
        body: { error: "User not found" },
      };
    }
    const { username, age, hobbies } = await getRequestBody(req);
    existingUser.username = username || existingUser.username;
    existingUser.age = age || existingUser.age;
    existingUser.hobbies = hobbies || existingUser.hobbies;

    return {
      statusCode: 200,
      body: existingUser,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: "Internal server error" },
    };
  }
}

export async function deleteUser(query: DeleteUserQuery): Promise<ApiResponse> {
  const { userId } = query;
  if (!userId || !isValidUuid(userId)) {
    return {
      statusCode: 400,
      body: { error: "Invalid userId" },
    };
  }

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return {
      statusCode: 404,
      body: { error: "User not found" },
    };
  }

  users.splice(index, 1);

  return {
    statusCode: 200,
    body: { message: "User deleted successfully" },
  };
}

export async function getUserById(
  query: GetUserByIdQuery
): Promise<ApiResponse> {
  const { userId } = query;
  if (!userId || !isValidUuid(userId)) {
    return {
      statusCode: 400,
      body: { error: "Invalid userId" },
    };
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return {
      statusCode: 404,
      body: { error: "User not found" },
    };
  }

  return {
    statusCode: 200,
    body: user,
  };
}
