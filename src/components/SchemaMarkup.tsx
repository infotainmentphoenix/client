import React from 'react';

// Using a generic Record<string, any> allows passing flexible structured data objects
// You can strictly type this using types from 'schema-dts' if added to the project.
export interface SchemaMarkupProps {
  schema: Record<string, any>;
}

/**
 * Reusable JSON-LD Schema Component
 * Dynamically injects perfect JSON-LD structured data into the <head> of any page
 * to dominate Google Rich Snippets.
 */
export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
