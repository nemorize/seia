import './webpack-global.js'
import { build as vite } from 'vite'
import { nodeExternals } from 'rollup-plugin-node-externals'
import { seia } from './vite-plugin-seia.js'

export const build = async () => {
	const entry = [
		'./src/App.tsx',
		'./src/A.tsx',
		'./src/B.tsx',
		'./src/C.tsx',
		'./src/D.tsx',
	]

	const plugins = [nodeExternals()]

	const defaultConfig = {
		plugins,
		build: {
			target: 'esnext',
			emptyOutDir: true,
			lib: {
				entry,
				formats: ['es'],
			},
		},
	}

	// RSC
	await vite({
		...defaultConfig,
		plugins: [plugins, seia()],
		build: {
			outDir: 'dist/rsc',
		},
	})

	// SSR
	await vite({
		...defaultConfig,
		build: {
			outDir: 'dist/ssr',
		},
	})

	// Hydration
	await vite({
		...defaultConfig,
		build: {
			outDir: 'dist/client',
		},
	})
}
