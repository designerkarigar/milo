import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

const idToken = localStorage.getItem("idToken");
const config = {
  headers: {
    token: idToken,
  },
};

export const getEvents = async () => {
  try {
    const events = await axios.get(
      BaseUrl + `/events?pageSize=999999&useQueryFilter=true`,
      config
    );
    return events.data.response.record;
  } catch (err) {
    throw new Error(err);
  }
};

export const getEventById = async (eventId) => {
  try {
    const events = await axios.get(BaseUrl + `/events/${eventId}`, config);
    return events.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadEvent = async (data) => {
  let eventData = {
    name: data.name,
    time: data.time,
    date: data.date,
    place: data.place,
    ticketPrice: data.ticketPrice,
    photos: [
      {
        image: data.coverImage,
        type: "Cover",
        contentType: "image/png",
      },
    ],
    description: data.description,
    organizer: data.organizer,
    contactPerson: data.contactPerson,
    contactDetails: data.contactDetails,
  };
  try {
    const event = await axios.post(BaseUrl + "/events", eventData, config);
  } catch (err) {
    throw new Error(err);
  }
};

export const updateEvent = async (data, eventId) => {
  let eventData = {
    name: data.name,
    time: data.time,
    date: data.date,
    place: data.place,
    ticketPrice: data.ticketPrice,
    photos: [
      {
        image: data.coverImage,
        type: "Cover",
        contentType: "image/png",
      },
    ],
    description: data.description,
    organizer: data.organizer,
    contactPerson: data.contactPerson,
    contactDetails: data.contactDetails,
  };

  try {
    const event = await axios.put(
      BaseUrl + `/events/${eventId}`,
      eventData,
      config
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const event = await axios.delete(BaseUrl + `/events/${eventId}`, config);
  } catch (err) {
    throw new Error(err);
  }
};
