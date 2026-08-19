/**
 * Extracts validation errors from various shapes returned by the backend api client.
 * Handles:
 * - Direct ZodIssue array (e.g. service controller errors)
 * - Raw ZodError object containing an issues array (e.g. event, user, artist controller errors)
 * - Formatted Zod format map (e.g. inquiry, auth controller errors)
 * - Flat key-value error map (e.g. { fieldName: "Error message" })
 */
export function extractValidationErrors(err: any): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  if (!err || !err.errors) return fieldErrors;

  try {
    let issues: any[] = [];
    if (Array.isArray(err.errors)) {
      issues = err.errors;
    } else if (typeof err.errors === 'object') {
      if (err.errors.name === 'ZodError' && typeof err.errors.message === 'string') {
        const parsed = JSON.parse(err.errors.message);
        if (Array.isArray(parsed)) {
          issues = parsed;
        }
      } else if (Array.isArray(err.errors.issues)) {
        issues = err.errors.issues;
      } else {
        // Handle formatted Zod error structure or a direct key-value error map
        const keys = Object.keys(err.errors);
        keys.forEach(key => {
          if (key === '_errors') return; // skip root errors
          const val = err.errors[key];
          if (typeof val === 'string') {
            fieldErrors[key] = val;
          } else if (val && typeof val === 'object' && Array.isArray(val._errors) && val._errors.length > 0) {
            fieldErrors[key] = val._errors[0];
          }
        });
        return fieldErrors;
      }
    }

    if (Array.isArray(issues)) {
      issues.forEach((issue: any) => {
        const path = Array.isArray(issue.path) ? issue.path[0] : null;
        if (path) {
          fieldErrors[path] = issue.message;
        }
      });
    }
  } catch (e) {
    console.error('Failed to extract validation errors:', e);
  }

  return fieldErrors;
}
