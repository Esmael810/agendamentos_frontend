export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.errors) {
      const messages = Object.values(errorData.errors).flat().join(", ");
      throw new Error(messages as string);
    }
    throw new Error(errorData?.message || "Erro inesperado");
  }
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}
