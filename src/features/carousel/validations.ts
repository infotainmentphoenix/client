import { z } from "zod";

const preprocessBoolean = (val: unknown) => {
  if (val === "true" || val === "1" || val === 1) return true;
  if (val === "false" || val === "0" || val === 0) return false;
  if (val === "" || val === null || val === undefined) return undefined;
  return val;
};

const preprocessNumber = (val: unknown) => {
  if (val === "" || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? val : num;
};

export const createCarouselValidation = z.object({
  title: z
    .string()
    .trim()
    .max(150, "Title must not exceed 150 characters")
    .optional()
    .nullable(),

  subtitle: z
    .string()
    .trim()
    .max(255, "Subtitle must not exceed 255 characters")
    .optional()
    .nullable(),

  imageUrl: z
    .string()
    .trim()
    .max(2048, "Image URL must not exceed 2048 characters")
    .optional()
    .nullable(),

  imageFieldId: z
    .string()
    .trim()
    .max(255, "Image field ID must not exceed 255 characters")
    .optional()
    .nullable(),

  linkUrl: z
    .string()
    .trim()
    .max(2048, "Link URL must not exceed 2048 characters")
    .optional()
    .nullable(),

  buttonText: z
    .string()
    .trim()
    .max(50, "Button text must not exceed 50 characters")
    .optional()
    .nullable(),

  sortOrder: z.preprocess(
    preprocessNumber,
    z
      .number({ message: "Sort order must be a number" })
      .int("Sort order must be an integer")
      .nonnegative("Sort order cannot be negative")
      .default(0)
      .optional()
  ),

  isActive: z.preprocess(
    preprocessBoolean,
    z
      .boolean({ message: "IsActive must be a boolean" })
      .default(true)
      .optional()
  ),
});

export const updateCarouselValidation = createCarouselValidation.partial();
