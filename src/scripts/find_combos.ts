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