import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				attributions: resolve(__dirname, "attributions.html"),
			}
		}
	}
});
