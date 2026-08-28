import { z } from "zod";

export const upsertSiteSettingValidation = z.object({
  key: z.string().trim().min(1, "Key is required"),
  value: z.string().trim().min(1, "Value is required"),
  type: z.string().optional().default("string"),
});
