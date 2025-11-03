import { describe, it, expect } from "vitest";
import { articleSchema } from "@/utils/validation/articleSchema";

describe("articleSchema", () => {
  it("validates a minimal draft", () => {
    const result = articleSchema.safeParse({
      title: "Hello",
      content: "<p>World</p>",
      status: "draft",
    });
    expect(result.success).toBe(true);
  });

  it("requires title and content", () => {
    const result = articleSchema.safeParse({ title: "", content: "" });
    expect(result.success).toBe(false);
  });
});

