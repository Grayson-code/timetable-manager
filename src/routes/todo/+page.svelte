<!--
 Copyright (c) 2023 Northern Star
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script async lang="ts">
	import InboxIcon from '$lib/assets/inbox.svg';
	import TodayIcon from '$lib/assets/today.svg';
	import TomorrowIcon from '$lib/assets/Tomorrow.svg';

	

</script>

<body>
	<nav>
		<div class="todo-pages">
			<a class="todo-container" href="/inbox">
				<img class="todo-icons" src={InboxIcon} alt="inbox" />
				<button class="todo-buttons"><p>Inbox</p></button>
			</a>
			<a class="todo-container" href="/todo">
				<img class="todo-icons" src={TodayIcon} alt="calender-today" />
				<button class="todo-buttons">Today</button>
			</a>
			<a class="todo-container" href="/todo/tomorrow">
				<img class="todo-icons" src={TomorrowIcon} alt="tomorrow-arrow" />
				<button class="todo-buttons">Tomorrow</button>
			</a>
		</div>
		<div class="projects-pages">
			<span class="projects-pages-text">Projects</span>
		</div>
		<div class="labels-pages" />
		<div class="filters-pages" />
	</nav>
	<main>main</main>
</body>

<style>
	body {
		display: flex;
		flex-direction: row;
		color: white;
	}
	nav {
		display: flex;
		flex-direction: column;
		flex: 0 0 400px;
		border: 0;
		border-right: 2px;
		border-color: #0e0e1b;
		border-style: solid;
	}
	main {
		flex: 2;
	}

	nav,
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.todo-pages {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	.todo-buttons {
		background-color: transparent;
		padding: 15px;
		border: none;
		color: white;
		cursor: pointer;
		text-decoration: none;
	}
	.todo-container {
		display: flex;
		align-items: center;
		transition: background-color ease;
		text-decoration: none;
	}

	.todo-container:hover {
		background-color: #131316;
	}
	.todo-container:active {
		background-color: #3d3d3f;
	}

	.todo-icons {
		height: 24px;
		padding-left: 10px;
	}
	.projects-pages {
		margin-top: 30px;
	}

	.projects-pages-text {
		font-weight: 500;
		font-size: 20px;
		margin-right: 25px;
	}
</style>
