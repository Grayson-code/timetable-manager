<!-- Login.svelte -->

<script>
  import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import app from './firebase';

  const auth = getAuth(app);

  let email = '';
  let password = '';

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
    } catch (error) {
      // Handle login error
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Google login successful
    } catch (error) {
      // Handle Google login error
    }
  }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={login}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit">Login</button>
</form>

<button on:click={loginWithGoogle}>Login with Google</button>
