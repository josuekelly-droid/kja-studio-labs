// src/components/seo/JsonLd.tsx

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  // Sécurisation contre les injections XSS en échappant les balises HTML dans le JSON
  const safeJsonStringify = (obj: unknown) => {
    return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(data) }}
    />
  );
}