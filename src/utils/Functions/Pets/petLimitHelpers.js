import { getPets } from "./getPets";
import { MAX_PETS_PER_USER } from "../../Constants/petLimits";

export async function getCurrentUserPetCount() {
  const pets = await getPets();
  return Array.isArray(pets) ? pets.length : 0;
}

export function isAtPetLimit(count) {
  return count >= MAX_PETS_PER_USER;
}
