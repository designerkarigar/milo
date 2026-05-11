/**
 * Maps PUT /v1/aiOperations/petDetection `record` into Lost & Found form defaults.
 * Handles camelCase / snake_case from the API.
 */

function normalizePetType(value) {
  const v = String(value || "")
    .trim()
    .toUpperCase();
  if (v.includes("DOG")) return "DOG";
  if (v.includes("CAT")) return "CAT";
  return v === "DOG" || v === "CAT" || v === "OTHER" ? v : "DOG";
}

function traitsToString(traits) {
  if (!traits) return "";
  if (Array.isArray(traits)) return traits.filter(Boolean).map(String).join(", ");
  return String(traits);
}

export function mapAiDetectionToLostFoundForm(record) {
  const aiFields = new Set();
  if (!record || typeof record !== "object") {
    return {
      petType: "DOG",
      breed: "",
      color: "",
      description: "",
      ageCategory: "",
      recommendedFood: "",
      traitsDisplay: "",
      raw: null,
      aiFields,
    };
  }

  const petTypeRaw =
    record.petType ?? record.pet_type ?? record.animalType ?? record.animal_type ?? "";
  const petType = petTypeRaw ? normalizePetType(petTypeRaw) : "DOG";
  if (petTypeRaw) aiFields.add("petType");

  const breed = String(record.breed ?? record.breedName ?? "").trim();
  if (breed) aiFields.add("breed");

  const traits =
    record.mostSimilarTraits ??
    record.most_similar_traits ??
    record.similarTraits ??
    record.traits;
  const traitsDisplay = traitsToString(traits);
  let color = "";
  if (traitsDisplay) {
    color = traitsDisplay;
    aiFields.add("color");
  }

  const recommendedFood =
    String(record.recommended_food ?? record.recommendedFood ?? "").trim() || "";

  const ageCategory =
    String(record.age_category ?? record.ageCategory ?? "").trim() || "";

  const descParts = [];
  if (record.description) descParts.push(String(record.description).trim());
  if (recommendedFood) descParts.push(`Diet suggestion (AI): ${recommendedFood}`);
  if (ageCategory) descParts.push(`Estimated age (AI): ${ageCategory}`);
  if (traitsDisplay) descParts.push(`Visible traits (AI): ${traitsDisplay}`);
  const description = descParts.filter(Boolean).join("\n\n");
  if (description) aiFields.add("description");

  return {
    petType,
    breed,
    color,
    description,
    ageCategory,
    recommendedFood,
    traitsDisplay,
    raw: record,
    aiFields,
  };
}

export function pickAiConfidenceSummary(record) {
  if (!record || typeof record !== "object") return "";
  const c =
    record.confidence ??
    record.score ??
    record.detectionConfidence ??
    record.detection_confidence;
  if (c == null || c === "") return "";
  if (typeof c === "number") return `${Math.round(c <= 1 ? c * 100 : c)}%`;
  return String(c);
}
