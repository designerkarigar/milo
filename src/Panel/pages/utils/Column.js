/** Formats API location (string or { address, city, state, zip, country }) for grid cells. */
export const formatLocationForCell = (location) => {
  if (location == null) return "";
  if (typeof location === "string") return location;
  if (typeof location === "object") {
    const { address, city, state, zip, country } = location;
    const parts = [address, city, state, zip, country].filter(
      (p) => p != null && String(p).trim() !== ""
    );
    return parts.join(", ");
  }
  return String(location);
};

/** Formats availableHours (string, {from,to}, or array of those) for grid cells. */
export const formatAvailableHoursForCell = (hours) => {
  if (hours == null) return "";
  if (typeof hours === "string") return hours;
  if (Array.isArray(hours)) {
    return hours
      .map((h) => {
        if (h == null) return "";
        if (typeof h === "string") return h;
        if (typeof h === "object" && h.from != null && h.to != null) {
          return `${h.from} - ${h.to}`;
        }
        return "";
      })
      .filter((s) => s !== "")
      .join(", ");
  }
  if (typeof hours === "object" && hours.from != null && hours.to != null) {
    return `${hours.from} - ${hours.to}`;
  }
  return String(hours);
};

/** Formats daysOfOperation (string, primitives, or array) for grid cells. */
export const formatDaysOfOperationForCell = (days) => {
  if (days == null) return "";
  if (typeof days === "string") return days;
  if (!Array.isArray(days)) {
    if (typeof days === "object") {
      if (days.day != null) return String(days.day);
      if (days.name != null) return String(days.name);
    }
    return String(days);
  }
  return days
    .map((d) => {
      if (d == null) return "";
      if (typeof d === "string" || typeof d === "number" || typeof d === "boolean") {
        return String(d);
      }
      if (typeof d === "object") {
        if (d.day != null) return String(d.day);
        if (d.name != null) return String(d.name);
      }
      return "";
    })
    .filter((s) => s !== "")
    .join(", ");
};

export const bookingColumn = [
  {
    header: "Customer",
    name: "name",
    defaultFlex: 1,
  },
  {
    header: "Status",
    name: "status",
    defaultFlex: 1,
  },

  {
    header: "Amount",
    name: "amount",
    defaultFlex: 1,
  },
  {
    header: "Booking Date",
    name: "bookingDate",
    defaultFlex: 1,
  },
  {
    header: "Date",
    name: "date",
    defaultFlex: 1,
  },
  {
    header: "Time",
    name: "time",
    defaultFlex: 1,
  },
];

export const chrecheColumn = [
  {
    header: "Name",
    name: "name",
    defaultFlex: 1,
    render: ({ data, value }) =>
      value != null && String(value).trim() !== ""
        ? value
        : data.crecheName || "",
  },
  {
    header: "Location",
    name: "location",
    defaultFlex: 1,
    render: ({ value }) => formatLocationForCell(value),
  },

  {
    header: "Mobile",
    name: "mobile",
    defaultFlex: 1,
  },
  {
    header: "Verified",
    name: "verified",
    defaultFlex: 1,
  },
  {
    header: "Email",
    name: "email",
    defaultFlex: 1,
  },
];

export const usersColumn = [
  {
    header: "Name",
    name: "name",
    defaultFlex: 1,
  },
  {
    header: "Email",
    name: "email",
    defaultFlex: 1.5,
  },
  {
    header: "Mobile",
    name: "mobile",
    defaultFlex: 1,
  },
  {
    header: "Location",
    name: "location",
    defaultFlex: 1,
    render: ({ value }) => formatLocationForCell(value),
  },
  {
    header: "Verified",
    name: "verified",
    defaultFlex: 0.8,
  },
  {
    header: "Type",
    name: "type",
    defaultFlex: 1.5,
  },
];

export const vetColumn = [
  {
    header: "Name",
    name: "name",
    defaultFlex: 1,
  },
  {
    header: "Clinic Name",  // Add this new column
    name: "clinicName",
    defaultFlex: 1.5,
  },
  {
    header: "Mobile No",
    name: "mobile",
    defaultFlex: 1,
  },
  {
    header: "Timings",
    name: "availableHours",
    defaultFlex: 3.5,
    render: ({ value }) => formatAvailableHoursForCell(value),
  },
  {
    header: "Verified",
    name: "verified",
    defaultFlex: 1,
  },
  {
    header: "Location",
    name: "location",
    defaultFlex: 1,
    render: ({ value }) => formatLocationForCell(value),
  },
  {
    header: "Days of Operation",
    name: "daysOfOperation",
    defaultFlex: 4,
    render: ({ value }) => formatDaysOfOperationForCell(value),
  },
];

export const ngoColumn = [
  {
    header: "Name",
    name: "name",
    defaultFlex: 1,
  },
  {
    header: "Mobile",
    name: "mobile",
    defaultFlex: 1,
  },
  {
    header: "Location",
    name: "location",
    defaultFlex: 1,
    render: ({ value }) => formatLocationForCell(value),
  },
  {
    header: "Timings",
    name: "availableHours",
    defaultFlex: 2,
    render: ({ value }) => formatAvailableHoursForCell(value),
  },
  {
    header: "Verified",
    name: "verified",
    defaultFlex: 0.8,
  },
  {
    header: "Days of Operation",
    name: "daysOfOperation",
    defaultFlex: 2,
    render: ({ value }) => formatDaysOfOperationForCell(value),
  },
];

export const serviceProviderColumn = [
  {
    header: "Name",
    name: "name",
    defaultFlex: 1.5,
  },
  {
    header: "Service Type",
    name: "serviceType",
    defaultFlex: 1.5,
  },
  {
    header: "Mobile",
    name: "mobile",
    defaultFlex: 1,
  },
  {
    header: "Location",
    name: "location",
    defaultFlex: 1,
    render: ({ value }) => formatLocationForCell(value),
  },
  {
    header: "Verified",
    name: "verified",
    defaultFlex: 0.8,
  },
];
