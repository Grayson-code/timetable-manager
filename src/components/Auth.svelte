<script>
	import { authHandlers, authStore } from '../stores/authStore';

	let register = false;
	let email = '';
	let password = '';
	let confirmPassword = '';

	async function handleSubmit() {
		if (!email || !password || (register && !confirmPassword)) {
			return;
		}

		if (register && password === confirmPassword) {
			try {
				await authHandlers.signup(email, password);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await authHandlers.login(email, password);
			} catch (err) {
				console.log(err);
			}
		}
		if ($authStore.currentUser) {
			window.location.href = '/privatedashboard';
		}
	}
</script>

<div class="container">
	<h1>{register ? 'Register' : 'Log in'}</h1>
	<form>
		<label>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>
		{#if register}
			<label>
				<input bind:value={confirmPassword} type="password" placeholder="Confirm Password" />
			</label>
		{/if}
		<button on:click={handleSubmit}>Submit</button>
	</form>
	{#if register}
		<div
			on:click={() => {
				register = false;
			}}
			on:keydown={() => {}}
		>
			Already have an account?
			<p>Log in</p>
		</div>
	{:else}
		<div
			on:click={() => {
				register = true;
			}}
			on:keydown={() => {}}
		>
			Don't have an account? <p>Sign Up</p>
		</div>
		<div
			on:click={() => {
				authHandlers.resetPassword(email)
			}}
			on:keydown={() => {}}
		>
			Forgot Password?
		</div>
	{/if}
</div>

      <style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		background-color: #01010f;
		padding: 20px;
	}

	.container form {
		display: flex;
		flex-direction: column;
	}

	.container h1 {
		color: #ffffff;
		margin-bottom: 20px;
	}

	input[type="email"],
	input[type="password"] {
		width: 100%;
		padding: 10px;
		margin-bottom: 20px;
		border-radius: 5px;
		border: 1px solid #f863f0;
		background-color: #01010f;
		color: #ffffff;
	}

	button {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: none;
		background-color: #b563f8;
		color: #ffffff;
		font-weight: bold;
		cursor: pointer;
		margin-bottom: 20px;
	}

	.container div {
		color: #ffffff;
		margin-bottom: 10px;
		cursor: pointer;
	}

	.container div p {
		display: inline;
		color: #f863f0;
	}

	@media only screen and (max-width: 600px) {
		.container {
			padding: 10px;
		}

		input[type="email"],
		input[type="password"] {
			margin-bottom: 10px;
		}

		button {
			margin-bottom: 10px;
		}
	}
      </style>