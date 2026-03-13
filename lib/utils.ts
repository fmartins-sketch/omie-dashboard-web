export function cls(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}
