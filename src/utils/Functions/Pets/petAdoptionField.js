/**
 * PETS.AVAILABLE_FOR_ADOPTION → "availableForAdoption" (camelCase storage/API).
 * Coercion handles normal booleans plus occasional string/number from serializers.
 */
export function coerceBooleanAdoption(value) {
  if (value === true || value === 1) return true;
  if (value === false || value === 0 || value == null) return false;
  if (typeof value === "string") {
    const s = value.trim().toLowerCase();
    if (s === "true" || s === "yes" || s === "1") return true;
    if (s === "false" || s === "no" || s === "0" || s === "") return false;
  }
  return Boolean(value);
}

export function readAvailableForAdoption(record) {
  if (!record || typeof record !== "object") return false;
  return coerceBooleanAdoption(record.availableForAdoption);
}

export function adoptionFieldsForApi(flag) {
  return { availableForAdoption: flag };
}
