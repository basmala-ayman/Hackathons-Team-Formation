const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") ||
  "http://localhost:3000";

export const ANONYMOUS_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export function getAvatarUrl(path) {
  if (!path) return ANONYMOUS_AVATAR;

  if (path.startsWith("blob:")) return path;

  if (path.startsWith("http")) return path;

  return `${BACKEND_URL}${path}`;
}
