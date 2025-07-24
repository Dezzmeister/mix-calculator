import { hydrate, prerender as ssr } from 'preact-iso';

import '../style.css';
import { MixCalculator } from "../screens/MixCalculator";

if (typeof window !== 'undefined') {
	hydrate(<MixCalculator />, document.getElementById('app')!);
}

// This is called by the Preact plugin when building
export async function prerender() {
	return await ssr(<MixCalculator />);
}