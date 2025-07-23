/**
 * Determines the properties that can be mixed to produce desired effects.
 * The result is a JSON file called "combomap.json" keyed by desired effect.
 */
/// <reference types="node" />
import productManager from "../data/product_manager.json" with { type: "json" };
import { getNewEffect } from "../utils/mix_calculator.ts";
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
    // Assume that all mixer maps are the same (this might not be true in the future)
    const mixerMap = productManager.methMixMap;
    const effects = mixerMap.effects;
    const ingredientProperties = productManager.mixIngredients.map(i => i.properties[0]);
    const comboMap: ComboMap = {};

    for (let i = 0; i < effects.length; i++) {
        for (let j = 0; j < ingredientProperties.length; j++) {
            const effect = effects[i];
            const property = ingredientProperties[j];

            const newEffect = getNewEffect(mixerMap, effect, property);

            if (newEffect !== null) {
                comboMap[newEffect.property.name] ||= [];
                comboMap[newEffect.property.name].push({
                    existingProperty: effect.property.name,
                    newProperty: property.name,
                });
            }
        }
    }

    
    const comboMapPath = path.resolve(import.meta.dirname, "..", "data", "combomap.json");
    fs.writeFileSync(comboMapPath, JSON.stringify(comboMap, undefined, 2));
}