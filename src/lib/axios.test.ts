import axiosLib from "@/lib/axios";
import axios from "axios";

jest.mock("axios");

describe("axiosLib", () => {
  it("should create an axios instance with correct base URL and headers", () => {
    const defaultBaseUrl = "http://example.com/api";
    const defaultToken = "my-token";

    // Set up environment variables
    process.env.NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || defaultBaseUrl;
    process.env.NEXT_PUBLIC_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || defaultToken;

    // Create the axiosLib instance
    const instance = axiosLib;

    // Verify that axios.create was called with the correct arguments
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    // Reset environment variables
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_API_TOKEN;
  });
});
