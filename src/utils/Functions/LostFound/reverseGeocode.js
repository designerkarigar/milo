/** Reverse geocode coordinates into city, state, postcode, country, and a short address line. */

function pickFirst(...vals) {
  for (const v of vals) {
    const s = String(v ?? "").trim();
    if (s) return s;
  }
  return "";
}

async function reverseGeocodeNominatim(lat, lng) {
  const url =
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&addressdetails=1`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
  });

  if (!res.ok) {
    throw new Error(`Nominatim HTTP ${res.status}`);
  }

  const data = await res.json();
  const a = data.address || {};

  const city = pickFirst(
    a.city,
    a.town,
    a.village,
    a.municipality,
    a.city_district,
    a.county,
    a.state_district
  );

  const state = pickFirst(a.state, a.region, a.province);
  const zip = pickFirst(a.postcode);
  const country = pickFirst(a.country) || "India";

  const roadLine = [a.house_number, a.road].filter(Boolean).join(" ").trim();
  const area = pickFirst(
    a.suburb,
    a.neighbourhood,
    a.quarter,
    a.residential,
    a.hamlet,
    a.industrial
  );

  let address = roadLine;
  if (!address && area && city) address = `${area}, ${city}`;
  else if (!address && area) address = area;
  else if (!address && city) address = city;
  else if (!address && data.display_name) {
    address = data.display_name
      .split(",")
      .slice(0, 3)
      .map((s) => s.trim())
      .join(", ");
  }

  if (!city && !state && !country) {
    throw new Error("Nominatim returned no usable address");
  }

  return {
    address,
    city,
    state,
    zip,
    country,
  };
}

async function reverseGeocodeBigDataCloud(lat, lng) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(lng)}&localityLanguage=en`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`BigDataCloud HTTP ${res.status}`);
  }

  const d = await res.json();

  // Never use principalSubdivision as city — it is the state/province name.
  let city = pickFirst(d.city, d.locality);

  // Some responses nest locality names under localityInfo.administrative
  const admins = d.localityInfo?.administrative;
  if (!city && Array.isArray(admins)) {
    const preferred = admins.find((x) => x?.description?.toLowerCase()?.includes("city"));
    city = pickFirst(preferred?.name, admins[0]?.name);
  }

  const locality = pickFirst(d.locality);
  let address = "";
  if (locality && city && locality !== city) {
    address = `${locality}, ${city}`;
  } else if (locality) {
    address = locality;
  } else if (city) {
    address = city;
  }

  const state = pickFirst(d.principalSubdivision);
  const zip = pickFirst(d.postcode);
  const country = pickFirst(d.countryName) || "India";

  if (!city && !state && !address) {
    throw new Error("No address returned");
  }

  return {
    address,
    city,
    state,
    zip,
    country,
  };
}

export async function reverseGeocodeFromCoords(lat, lng) {
  const latN = Number(lat);
  const lngN = Number(lng);
  if (Number.isNaN(latN) || Number.isNaN(lngN)) {
    throw new Error("Invalid coordinates");
  }

  try {
    return await reverseGeocodeNominatim(latN, lngN);
  } catch {
    return await reverseGeocodeBigDataCloud(latN, lngN);
  }
}
