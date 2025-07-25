/*
 * This file is part of mix-calculator, a Schedule One mix calculator.
 * Copyright (C) 2024  Joe Desmond
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
/**
 * Determines the properties that can be mixed to produce desired effects.
 * The result is a JSON file called "combomap.json" keyed by desired effect.
 */
/// <reference types="node" />
import { getNewEffect } from "../utils/mix_calculator.ts";
import { getDataModel } from "../utils/transform.ts";
import fs from "node:fs";
import path from "node:path";

type MixCombo = {
    existingProperty: string;
    newProperty: string;
};

type ComboMap = {
    [propertyName: string]: MixCombo[];
};

main();

function main(): void {
    const model = getDataModel();
    const mixerMap = model.mixerMap;
    const effects = mixerMap.effects;
    const ingredientProperties = model.mixIngredients.map(i => i.property);
    const comboMap: ComboMap = {};

    for (let i = 0; i < effects.length; i++) {
        for (let j = 0; j < ingredientProperties.length; j++) {
            const effect = effects[i];
            const property = ingredientProperties[j];

            const newEffect = getNewEffect(mixerMap, effect, property);

            if (newEffect !== null) {
                comboMap[newEffect.property.id] ||= [];
                comboMap[newEffect.property.id].push({
                    existingProperty: effect.property.id,
                    newProperty: property.id,
                });
            }
        }
    }

    
    const comboMapPath = path.resolve(import.meta.dirname, "..", "data", "combomap.json");
    fs.writeFileSync(comboMapPath, JSON.stringify(comboMap, undefined, 2));
}