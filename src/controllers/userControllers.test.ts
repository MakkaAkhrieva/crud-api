import http from "http";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "./userControllers";
import { isValidUuid } from "../utils";

let users = [];
jest.mock("../types", () => ({
  User: jest.fn(),
}));

describe("getUsers", () => {
  beforeEach(() => {
    users = [];
  });

  test("should return an empty array if no users exist", async () => {
    const response = await getUsers();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("updateUser", () => {
  let mockRequest;
  beforeEach(() => {
    users = [
      { id: "1", username: "user1", age: 20, hobbies: [] },
      { id: "2", username: "user2", age: 25, hobbies: [] },
    ];
    mockRequest = {
      body: {
        username: "updatedUser",
        age: 30,
        hobbies: ["reading", "writing"],
      },
    };
  });

  test("should return an error if userId is missing", async () => {
    const query = { userId: undefined };
    const response = await updateUser(query, mockRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
  });

  test("should return an error if userId is not a valid UUID", async () => {
    const query = { userId: "123" };
    const response = await updateUser(query, mockRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
  });
});

describe("deleteUser", () => {
  beforeEach(() => {
    users = [
      { id: "1", username: "user1", age: 20, hobbies: [] },
      { id: "2", username: "user2", age: 25, hobbies: [] },
    ];
  });

  test("should return an error if userId is missing", async () => {
    const query = { userId: undefined };
    const response = await deleteUser(query);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
    expect(users.length).toBe(2);
  });

  test("should return an error if userId is not a valid UUID", async () => {
    const query = { userId: "123" };
    const response = await deleteUser(query);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
    expect(users.length).toBe(2);
  });
});

describe("getUserById", () => {
  beforeEach(() => {
    users = [
      { id: "1", username: "user1", age: 20, hobbies: [] },
      { id: "2", username: "user2", age: 25, hobbies: [] },
    ];
  });

  test("should return an error if userId is missing", async () => {
    const query = { userId: undefined };
    const response = await getUserById(query);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
  });

  test("should return an error if userId is not a valid UUID", async () => {
    const query = { userId: "123" };
    const response = await getUserById(query);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid userId");
  });
});

describe("isValidUuid", () => {
  test("should return true for a valid UUID", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    expect(isValidUuid(validUuid)).toBe(true);
  });

  test("should return false for an invalid UUID", () => {
    const invalidUuid = "123";
    expect(isValidUuid(invalidUuid)).toBe(false);
  });
});
