const MOCK_SUGGESTIONS = [
  "React",
  "React Router",
  "React Query",
  "React",
  "React Native",
  "Redux",
  "Redux Toolkit",
  "Javascript",
  "TypeScript",
  "Frontend System Design",
  "Machine Coding",
  "Next.js",
  "Node.js",
];

export function fetchSuggestions(query, signal) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException("Request aborted", "AbortError"));
        return;
      }
      const result = MOCK_SUGGESTIONS.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      ).map((item, index) => ({
        id: `${item}-${index}`,
        label: item,
      }));
      resolve(result);
    }, 500);
    signal?.addEventListener("abort", () => {
      clearTimeout(timerId);
      reject(new DOMException("Request aborted", "AbortError"));
    });
  });
}
