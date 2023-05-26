// import type { PlaywrightTestConfig } from '@playwright/test';

// const config: PlaywrightTestConfig = {
// 	webServer: {
// 		command: 'npm run build && npm run preview',
// 		port: 4173
// 	},
// 	testDir: 'tests',
// 	testMatch: /(.+\.)?(test|spec)\.[jt]s/
// };

// export default config;

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
	  adapter: adapter(),
  	vite: {
  		server: {
  			hmr: {
  				clientPort: 443
  			}
  		}
  	}
	}
};


export default config;
