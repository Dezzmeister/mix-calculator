import React from "preact";
import { hydrate, prerender as ssr } from 'preact-iso';

import './style.css';
import { MixCalculator } from "./screens/MixCalculator";

export const App: React.FunctionComponent<{}> = () => {
	return (
		<MixCalculator />
	);
};

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app')!);
}

// This is called by the Preact plugin when building
export async function prerender(data: {}) {
	return await ssr(<App {...data} />);
}
