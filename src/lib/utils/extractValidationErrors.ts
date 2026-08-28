/**
 * Extracts validation errors from various shapes returned by the backend api client.
 * Handles:
 * - Direct ZodIssue array (e.g. service controller errors)
 * - Raw ZodError object containing an issues array (e.g. event, user, artist controller errors)
 * - Formatted Zod format map (e.g. inquiry, auth controller errors)
 * - Flat key-value error map (e.g. { fieldName: "Error message" })
 */
export function extractValidationErrors(err: unknown): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  
  if (typeof err !== 'object' || err === null || !('errors' in err)) return fieldErrors;
  
  const errObj = err as { errors?: unknown };
  if (!errObj.errors) return fieldErrors;

  try {
    let issues: unknown[] = [];
    if (Array.isArray(errObj.errors)) {
      issues = errObj.errors;
    } else if (typeof errObj.errors === 'object' && errObj.errors !== null) {
      const errorsObj = errObj.errors as Record<string, unknown>;
      
      if (errorsObj.name === 'ZodError' && typeof errorsObj.message === 'string') {
        const parsed = JSON.parse(errorsObj.message);
        if (Array.isArray(parsed)) {
          issues = parsed;
        }
      } else if (Array.isArray(errorsObj.issues)) {
        issues = errorsObj.issues;
      } else {
        // Handle formatted Zod error structure or a direct key-value error map
        const keys = Object.keys(errorsObj);
        keys.forEach(key => {
          if (key === '_errors') return; // skip root errors
          const val = errorsObj[key];
          if (typeof val === 'string') {
            fieldErrors[key] = val;
          } else if (val && typeof val === 'object' && 'Math' in Object || true) {
            // Check if val is an object with _errors array
            const valObj = val as { _errors?: unknown[] };
            if (Array.isArray(valObj._errors) && valObj._errors.length > 0 && typeof valObj._errors[0] === 'string') {
              fieldErrors[key] = valObj._errors[0];
            }
          }
        });
        return fieldErrors;
      }
    }

    if (Array.isArray(issues)) {
      issues.forEach((issue: unknown) => {
        if (typeof issue === 'object' && issue !== null) {
          const issueObj = issue as { path?: unknown[], message?: unknown };
          const path = Array.isArray(issueObj.path) ? issueObj.path[0] : null;
          if (path && typeof path === 'string' && typeof issueObj.message === 'string') {
            fieldErrors[path] = issueObj.message;
          }
        }
      });
    }
  } catch (e) {
    console.error('Failed to extract validation errors:', e);
  }

  return fieldErrors;
}
