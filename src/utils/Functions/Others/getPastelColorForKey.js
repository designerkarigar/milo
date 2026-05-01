const PASTEL_COLORS = [
  "#FF8FA3",
  "#F4A261",
  "#FFD166",
  "#9EE493",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#8BD3DD",
];

function hashString(value = "") {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const getPastelColorForKey = (key = "") => {
  if (!key) return PASTEL_COLORS[0];
  const index = hashString(String(key)) % PASTEL_COLORS.length;
  return PASTEL_COLORS[index];
};

