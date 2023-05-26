<!-- Signup.svelte -->

<script>
  import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import app from './firebase';

  const auth = getAuth(app);

  let email = '';
  let password = '';

  async function signup() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Signup successful
    } catch (error) {
      // Handle signup error
    }
  }

  async function signupWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Google signup successful
    } catch (error) {
      // Handle Google signup error
    }
  }
</script>

<h1>Sign Up</h1>

<form on:submit|preventDefault={signup}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit">Sign Up</button>
</form>

<button on:click={signupWithGoogle}>Sign Up with Google</button>
