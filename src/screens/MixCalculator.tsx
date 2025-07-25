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
import React from "preact";
import { MixerMap } from "../components/MixerMap";
import { MixIngredientList } from "../components/MixIngredientList";
import { MixIngredient, Property } from "../utils/types";
import { useState } from "preact/hooks";
import { PropertyDiffList, PropertyList } from "../components/PropertyList";
import { mixProperties } from "../utils/mix_calculator";
import { ComboList } from "../components/ComboList";
import { getDataModel } from "../utils/transform";

export const MixCalculator: React.FunctionComponent<{}> = () => {
	const [existingProperties, setExistingProperties] = useState<readonly Property[]>([]);
	const [nextProperty, setNextProperty] = useState<Property | undefined>();
	const [ingredients, setMixIngredients] = useState<readonly MixIngredient[]>([]);
	const [desiredProperty, setDesiredProperty] = useState<Property | undefined>();

	const model = getDataModel();

	const resultProperties = (() => {
		if (!nextProperty) {
			return <PropertyList properties={existingProperties} withDummy />
		}

		const newProperties = mixProperties(model.mixerMap, existingProperties, nextProperty);

		return (
			<PropertyDiffList
				oldProperties={existingProperties}
				newProperties={newProperties}
				withDummy={existingProperties.length === newProperties.length}
			/>
		);
	})();

	return (
		<div>
			<h1>Schedule One Mix Calculator</h1>
			<p>
				This calculator shows a visual of the algorithm that Schedule One uses
				to mix "properties" (energizing, calorie-dense, etc.).
				<br />
				Click on mix ingredients on the right to create a mix. The resulting mix will be shown below the mixer map.
				<br />
				Click on an effect in the mixer map to show properties that
				can be mixed to create that effect.
			</p>
			<div className="mix-calculator">
				<div className="mix-calculator-side-column">
					<h2>Info</h2>
					<p>
						There are three mixer maps, one for each drug type, but they
						all happen to be identical. Each effect has a position in the
						map, a radius, and a property. Each property has a mix vector
						pointing away from the center of the map. Each mix ingredient
						has a list of associated properties, but it happens that each
						of these lists has only one item, so we treat each ingredient
						as having one property.
					</p>
					<p>
						When an ingredient is added to a mix, the algorithm tries to mix
						the ingredient's property with the properties in the mix. The new
						property's mix vector is added to the position of each property in the
						mix. If this vector sum lands in another property's circle, then the
						existing property is replaced with the new property whose circle the
						sum lands in. You can see which properties will be replaced when you
						hover over a mix ingredient on the right.
					</p>
					<h4><a href="./attributions.html">Attributions</a></h4>
					<h4>
						<a href="https://github.com/Dezzmeister/mix-calculator/issues/new" target="_blank">
							Report an issue
						</a>
					</h4>
				</div>
				<div>
					<h2>Mixer Map</h2>
					<div>
						<MixerMap
							mixerMap={model.mixerMap}
							padding={15}
							scale={100}
							existingProperties={existingProperties}
							nextProperty={nextProperty}
							onClickProperty={setDesiredProperty}
						/>
						<div>
							<h2>Result</h2>
							<div className="result-lists">
								<div className="result-property-list">
									<h3>Properties</h3>
									{resultProperties}
								</div>
								<div className="result-ingredient-list">
									<h3>Ingredients</h3>
									<MixIngredientList
										mixIngredients={ingredients}
										onIngredientDeleted={(idx) => setMixIngredients((ingredients) => {
											const newIngredients = [...ingredients];
											newIngredients.splice(idx, 1);
											let newProps: Property[] = [];

											for (const ingredient of newIngredients) {
												newProps = mixProperties(model.mixerMap, newProps, ingredient.property);
											}

											setExistingProperties(newProps);

											return newIngredients;
										})}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mix-calculator-side-column">
					<h2>Mix Ingredients</h2>
					<MixIngredientList
						mixIngredients={model.mixIngredients}
						onIngredientAddedToMix={(ingredient) => {
							setExistingProperties(
								mixProperties(model.mixerMap, existingProperties, ingredient.property)
							);
							setMixIngredients(mixIngredients => [...mixIngredients, ingredient]);
						}}
						onIngredientHovered={(ingredient) => setNextProperty(ingredient?.property)}
					/>
					{desiredProperty && (
						<ComboList
							desiredProperty={desiredProperty}
						/>
					)}
				</div>
			</div>
		</div>
	);
};