import { APIRequestContext, APIResponse } from "@playwright/test";
import { logger } from "../base";

/**
 * Service layer for Todo API operations (JSONPlaceholder /todos).
 */
export class TodoApiService {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * GET /todos — Retrieve all todos.
   */
  async getTodos(): Promise<APIResponse> {
    logger.info("GET /todos");
    return await this.request.get("/todos");
  }

  /**
   * GET /todos/{id} — Retrieve a single todo by ID.
   */
  async getTodoById(id: number): Promise<APIResponse> {
    logger.info(`GET /todos/${id}`);
    return await this.request.get(`/todos/${id}`);
  }

  /**
   * GET /todos?userId={userId} — Retrieve todos filtered by user.
   */
  async getTodosByUserId(userId: number): Promise<APIResponse> {
    logger.info(`GET /todos?userId=${userId}`);
    return await this.request.get(`/todos?userId=${userId}`);
  }
}
