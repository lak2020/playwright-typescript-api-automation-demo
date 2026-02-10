import { faker } from "@faker-js/faker";
import { CreatePostRequest, UpdatePostRequest } from "../models";

/**
 * Generate a CreatePostRequest with random title, body, and userId.
 */
export function generateCreatePostRequest(): CreatePostRequest {
  return {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

/**
 * Generate an UpdatePostRequest with random title, body, and userId.
 */
export function generateUpdatePostRequest(): UpdatePostRequest {
  return {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

/**
 * Generate multiple CreatePostRequests for data-driven testing.
 */
export function generateMultiplePosts(count: number): CreatePostRequest[] {
  return Array.from({ length: count }, () => generateCreatePostRequest());
}

/**
 * Generate a random email address.
 */
export function generateEmail(): string {
  return faker.internet.email();
}

/**
 * Generate a random sentence for titles.
 */
export function generateTitle(): string {
  return faker.lorem.sentence();
}
