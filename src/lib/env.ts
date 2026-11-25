/**
 * Values copied from `.env.example` are intentionally non-functional so the
 * labelled demo content remains active until real credentials are supplied.
 */
const placeholderPattern = /^(?:YOUR_|REPLACE_WITH_|PLACEHOLDER_|CHANGE_ME_|<)/i;

export function isPlaceholderEnvValue(
  value: string | undefined | null,
): boolean {
  const trimmed = value?.trim();
  return !trimmed || placeholderPattern.test(trimmed);
}
