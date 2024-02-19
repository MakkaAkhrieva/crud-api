import http from "http";
import { ApiResponse } from "./types";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/userControllers";

export async function handleRequest(
  method: string,
  pathname: string,
  query: any,
  req: http.IncomingMessage
): Promise<ApiResponse> {
  if (method === "GET" && pathname === "/api/users") {
    return getUsers();
  } else if (method === "POST" && pathname === "/api/users") {
    return createUser(req);
  } else if (method === "PUT" && pathname.startsWith("/api/users/")) {
    const userId = pathname.split("/").pop();
    return updateUser({ userId }, req);
  } else if (method === "DELETE" && pathname.startsWith("/api/users/")) {
    const userId = pathname.split("/").pop();
    return deleteUser({ userId });
  } else if (method === "GET" && pathname.startsWith("/api/users/")) {
    const userId = pathname.split("/").pop();
    return getUserById({ userId });
  } else {
    return {
      statusCode: 404,
      body: { error: "Endpoint not found" },
    };
  }
}
