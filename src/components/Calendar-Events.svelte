<script lang="ts">
  import { fade } from "svelte/transition";
  import { createNewEvent, scheduleDate } from "./calendar.stores";

  $: $scheduleDate, showScheduler();
  $: isVisible = false;

  let eventName: string = "";
  let startTime: string;
  let endTime: string;

  function showScheduler() {
    if (!$scheduleDate) {
      return;
    }
    isVisible = true;
  }

  function createEvent() {
    let splitStartTime: string[];
    let splitEndTime: string[];

    if (!startTime) {
      splitStartTime = ["0", "0"];
    } else {
      splitStartTime = startTime.split(":");
    }

    if (!endTime) {
      splitEndTime = ["0", "0"];
    } else {
      splitEndTime = endTime.split(":");
    }

    const startDateTime = new Date(
      $scheduleDate.getFullYear(),
      $scheduleDate.getMonth(),
      $scheduleDate.getDate(),
      +splitStartTime[0],
      +splitStartTime[1]
    );
    const endDateTime = new Date(
      $scheduleDate.getFullYear(),
      $scheduleDate.getMonth(),
      $scheduleDate.getDate(),
      +splitEndTime[0],
      +splitEndTime[1]
    );

    createNewEvent({
      eventName: eventName,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    });
    clearScheduler();
  }

  function clearScheduler() {
    eventName = "";
    startTime = "";
    endTime = "";
    isVisible = false;
  }

  function eventCreationDate(): string {
    if (!$scheduleDate) {
      return;
    }

    return `${$scheduleDate.getDate()}/${
      $scheduleDate.getMonth() + 1
    }/${$scheduleDate.getFullYear()}`;
  }
</script>

{#if isVisible}
  <div id="calendar-scheduler" in:fade out:fade>
    <h1>Create new event for {eventCreationDate()}</h1>
    <label for="eventName">Event Name:</label>
    <input type="text" id="eventName" bind:value={eventName} />
    <br /><br />
    <label for="timeName">Time:</label>
    <input type="time" id="appt" bind:value={startTime} />
    <input type="time" id="appt" bind:value={endTime} />
    <br /><br />
    <button on:click={() => createEvent()}>Create Event</button>
    <button on:click={() => clearScheduler()}>Cancel</button>
  </div>
  <div
    class="scheduler-filler"
    in:fade
    out:fade
    on:click={() => clearScheduler()}
  />
{/if}

<style>
  h1 {
    text-align: center;
  }
  #calendar-scheduler {
    position: absolute;
    top: 0;
    width: 100%;
    background: #ffffff;
    height: 300px;
    border-bottom: 5px solid rgba(99, 108, 238, 0.5);
    text-align: center;
    z-index: 100;
  }
  .scheduler-filler {
    position: absolute;
    bottom: 0;
    background: #48484866;
    height: 100%;
    width: 100%;
    z-index: 95;
  }
</style>