<script lang="ts">
	import AuthReset from '../../components/AuthReset.svelte';
	import { auth } from '../../lib/firebase/firebase.client';
	import { authHandlers, authStore } from '../../stores/authStore';
	import type { CurrentUser } from '../../app';

	let currentUser: CurrentUser

	authStore.subscribe((state) => {
		currentUser = state.currentUser!;
	});
</script>

{#if $authStore.currentUser}
	<div>
		<h1>CURRENT USER: {currentUser.email}</h1>
		<AuthReset />
        <button on:click={authHandlers.logout}>Logout</button>

	</div>
{:else}
	<div>Loading....</div>
{/if}

<style>
	div {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		text-align: center;
	}
</style>