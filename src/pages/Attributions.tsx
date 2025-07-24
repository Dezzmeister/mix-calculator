import { hydrate, prerender as ssr } from 'preact-iso';

import '../style.css';
import { Attributions } from "../screens/Attributions";

if (typeof window !== 'undefined') {
	hydrate(<Attributions />, document.getElementById('app')!);
}

// This is called by the Preact plugin when building
export async function prerender() {
	return await ssr(<Attributions />);
}