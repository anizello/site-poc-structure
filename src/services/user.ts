import { UserProps } from "@/types/user";
import { URLs } from "@/constants/urls";

import { ApiError } from "@/utils/api-error";
import { replaceUrlParams } from "@/utils/urls";

interface UserResponse {
  data: UserProps;
  status: number;
  message: string;
}

export class UserService {
  private static instance: UserService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = URLs.EXTERNAL.CERBERUS.BASE;
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUserAuthInfo(
    accessToken: string,
    email: string,
  ): Promise<UserProps> {
    try {
      const ENDPOINT = replaceUrlParams(
        URLs.EXTERNAL.CERBERUS.ENDPOINTS.USER_INFO,
        { email },
      );

      const response = await fetch(`${this.baseUrl}${ENDPOINT}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new ApiError({
          message: "Failed to fetch user info",
          statusCode: response.status,
        });
      }

      const data: UserResponse = await response.json();
      return data.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError({
        message: "Failed to fetch user information",
        statusCode: 500,
        error,
      });
    }
  }
}

export const userService = UserService.getInstance();
