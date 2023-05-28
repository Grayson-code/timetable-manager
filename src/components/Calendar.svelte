<script lang="ts">
  import {
    daysInMonth,
    scheduleDate,
    selectedDate,
    viewCurrentDate,
  } from "./calendar.stores.ts";
  import Scheduler from "./Scheduler.svelte";
  import { days } from "./utils/date.utils";
  import CalendarEvents from "./Calendar-Events.svelte";
  const startingDayPosition = (dayIndex: number) => {
    const firstWeekDayOfTheMonth = new Date(
      $selectedDate.getFullYear(),
      $selectedDate.getMonth() + 1,
      1
    ).getDay();
    if (dayStartsAtSunday(firstWeekDayOfTheMonth, dayIndex)) {
      return `grid-column-start: ${7};`;
    }
    if (isFirstDayOfTheMonth(dayIndex)) {
      return `grid-column-start: ${firstWeekDayOfTheMonth};`;
    }
    return "";
  };
  function dayClickedEvent(dayIndex: number): void {
    scheduleDate.set(
      new Date($selectedDate.getFullYear(), $selectedDate.getMonth(), dayIndex)
    );
  }
  function isFirstDayOfTheMonth(dayIndex: number): boolean {
    return dayIndex === 1;
  }
  function dayStartsAtSunday(
    firstWeekDayOfTheMonth: number,
    dayIndex: number
  ): boolean {
    return firstWeekDayOfTheMonth === 0 && dayIndex === 1;
  }
  function nextMonth(): void {
    selectedDate.set(
      new Date(
        $selectedDate.getFullYear(),
        $selectedDate.getMonth() + 1,
        $selectedDate.getDate()
      )
    );
    viewCurrentDate.set(
      `${$selectedDate.getMonth() + 1}/${$selectedDate.getFullYear()}`
    );
    SetDaysInMonth();
  }
  function previousMonth(): void {
    selectedDate.set(
      new Date(
        $selectedDate.getFullYear(),
        $selectedDate.getMonth() - 1,
        $selectedDate.getDate()
      )
    );
    viewCurrentDate.set(
      `${$selectedDate.getMonth() + 1}/${$selectedDate.getFullYear()}`
    );
    SetDaysInMonth();
  }
  function SetDaysInMonth(): void {
    daysInMonth.set(
      new Date(
        $selectedDate.getFullYear(),
        $selectedDate.getMonth() + 1,
        0
      ).getDate()
    );
  }
</script>

<div id="calendar-wrapper">
  <div id="calendar-info">
    <div class="leftpicker" on:click={() => previousMonth()}>🥕</div>
    <div class="currentMonthYear">
      {$viewCurrentDate}
    </div>
    <div class="rightpicker" on:click={() => nextMonth()}>🥒</div>
  </div>

  <div id="calendar-container">
    {#each days as day}
      <div class="day">{day}</div>
    {/each}

    {#each { length: $daysInMonth } as _, dayIndex}
      <div
        class="day-cell"
        style={$daysInMonth ? startingDayPosition(dayIndex + 1) : ""}
        on:click={() => dayClickedEvent(dayIndex + 1)}
      >
        {dayIndex + 1}
        <svelte:component this={CalendarEvents} eventDayIndex={dayIndex + 1} />
      </div>
    {/each}
  </div>
</div>
<Scheduler />

<style>
  #calendar-wrapper {
    margin: 8px;
  }
  #calendar-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: #efefef;
    height: 100%;
  }
  #calendar-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: #ffffff;
    background: rgb(99, 108, 238);
    height: 100%;
    padding: 10px;
  }
  .currentMonthYear {
    text-align: center;
  }
  .leftpicker {
    justify-self: start;
  }
  .rightpicker {
    justify-self: end;
  }
  .leftpicker:hover,
  .rightpicker:hover {
    cursor: pointer;
  }
  .day-cell {
    padding: 20px;
    border: 1px solid #dbdbdb;
    background: #eaeaea;
  }
  .day-cell:hover {
    background: #b1b1b1;
    cursor: pointer;
  }
  .day {
    padding: 20px;
    border: 1px solid #dbdbdb;
    background: #ffffff;
  }
</style>