/*
 * This file is part of mix-calculator, a Schedule One mix calculator.
 * Copyright (C) 2025  Joe Desmond
 *
 * mix-calculator is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * mix-calculator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with mix-calculator.  If not, see <https://www.gnu.org/licenses/>.
 */
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