export const getStatusColor = (bookingStatus) => {
  switch (bookingStatus) {
    case "CREATED":
      return "blue";
    case "REJECTED":
      return "red";
    case "CONFIRMED":
      return "green";
    case "CANCELED":
      return "RED";
    case "APPROVED":
      return "green";
    case "COMPLETED":
      return "orange";
    default:
      return "black";
  }
};
