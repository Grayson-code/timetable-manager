import { writable } from "svelte/store";

const startingDate = new Date();

const eventData: Event[] = [
  {
    eventName: "Example Event",
    startDateTime: new Date(),
    endDateTime: new Date(),
  },
  {
    eventName: "Another Event",
    startDateTime: new Date(),
    endDateTime: new Date(),
  },
  {
    eventName: "Yet another Event",
    startDateTime: new Date(
      startingDate.getFullYear(),
      startingDate.getMonth() + 1,
      5
    ),
    endDateTime: new Date(
      startingDate.getFullYear(),
      startingDate.getMonth() + 1,
      5
    ),
  },
];

export const selectedDate = writable(startingDate);

export const viewCurrentDate = writable(
  `${startingDate.getMonth() + 1}/${startingDate.getFullYear()}`
);

export const daysInMonth = writable(
  new Date(startingDate.getFullYear(), startingDate.getMonth() + 1, 0).getDate()
);

export const scheduleDate = writable(<Date>null);

export const eventsForMonth = writable(eventData);

export const createNewEvent = (event: Event) => {
  eventsForMonth.update((e) => {
    e.push(event);
    return e;
  });
};

export interface Event {
  eventName: string;
  startDateTime: Date;
  endDateTime: Date;
           }