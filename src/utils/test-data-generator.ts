import { faker } from "@faker-js/faker";
import { CreatePostRequest, UpdatePostRequest } from "../models";

/**
 * Generates realistic random test data using @faker-js/faker.
 */
export class TestDataGenerator {
  /**
   * Generate a CreatePostRequest with random title, body, and userId.
   */
  static generateCreatePostRequest(): CreatePostRequest {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      userId: faker.number.int({ min: 1, max: 10 }),
    };
  }

  /**
   * Generate an UpdatePostRequest with random title, body, and userId.
   */
  static generateUpdatePostRequest(): UpdatePostRequest {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      userId: faker.number.int({ min: 1, max: 10 }),
    };
  }

  /**
   * Generate multiple CreatePostRequests for data-driven testing.
   */
  static generateMultiplePosts(count: number): CreatePostRequest[] {
    return Array.from({ length: count }, () =>
      TestDataGenerator.generateCreatePostRequest()
    );
  }

  /**
   * Generate a random email address.
   */
  static generateEmail(): string {
    return faker.internet.email();
  }

  /**
   * Generate a random sentence for titles.
   */
  static generateTitle(): string {
    return faker.lorem.sentence();
  }
}
