import { APIRequestContext, APIResponse } from "@playwright/test";
import { logger } from "../base";

/**
 * Service layer encapsulating User API operations (JSONPlaceholder /users).
 */
export class UserApiService {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * GET /users — Retrieve all users.
   */
  async getUsers(): Promise<APIResponse> {
    logger.info("GET /users");
    return await this.request.get("/users");
  }

  /**
   * GET /users/{id} — Retrieve a single user by ID.
   */
  async getUserById(id: number): Promise<APIResponse> {
    logger.info(`GET /users/${id}`);
    return await this.request.get(`/users/${id}`);
  }
}
