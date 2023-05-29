<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';

  // Define the current date
  let currentDate: Date;

  // Define the days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Define the days of the month
  let daysOfMonth: number[] = [];

  // Function to generate the days of the month
  function generateDaysOfMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Set up the calendar when the component is mounted
  onMount(() => {
    currentDate = new Date();
    generateDaysOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  });

  // Function to handle click animation
  function handleClick() {
    // Add your animation logic here
    console.log('Date clicked!');
  }
</script>

<main>
  <h1>Calendar</h1>
  <div class="calendar">
    <table class="header">
      <tr>
        {#each daysOfWeek as day}
          <th>{day}</th>
        {/each}
      </tr>
    </table>
    <div class="days">
      {#each daysOfMonth as day}
        <div class="day" on:click={handleClick}>{day}</div>
      {/each}
    </div>
  </div>
</main>

<style>
  .calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    border: 2px solid #01010f;
    padding: 1rem;
  }

  .header {
    background-color: #01010f;
    color: #ffffff;
    font-weight: bold;
    border-collapse: collapse;
    width: 100%;
  }

  .header th {
    padding: 0.5rem;
    text-align: center;
    border-bottom: 1px solid #ffffff;
  }

  .day {
    padding: 0.5rem;
    border: 1px solid #ffffff;
    background-color: #f863f0;
    color: #ffffff;
    text-align: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  .day:hover {
    background-color: #b563f8;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    text-align: center;
  }
  h1 {
    text-align:center;
  }
</style>
