// first time to use abortController, just for learning purpose
// This is a reusable wrapper for fetch that handles timeouts automatically
// You can use this in any service file (e.g. foodService.ts)
interface FetchOptions extends RequestInit {
  timeout?: number; // Optional timeout in milliseconds (default: 10000ms)
}

export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  // 1. Create the controller
  const controller = new AbortController();

  // 2. Set the timeout to abort the request
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // 3. Parse JSON automatically
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  } finally {
    // 4. Always clear the timeout to prevent memory leaks
    clearTimeout(id);
  }
}
