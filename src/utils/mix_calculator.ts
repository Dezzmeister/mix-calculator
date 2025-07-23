import type { Effect, MixerMap, Vector2, Property, Reaction } from "./types";

// TODO: Clean this up
export function mixProperties(
    mixerMap: MixerMap,
    existingProperties: readonly Property[],
    newProperty: Property
): Property[] {
    const mixerMapEffects = mixerMap.effects;
    const newPropDir = newProperty.mixDirection;
    const newPropMagnitude = newProperty.mixMagnitude;
    const reactionList: Reaction[] = [];

    const ZERO = 0;
    let existingPropertyStartAt = ZERO;
    let existingPropertyIndex: number;
    let effectIndex: number;
    let effectIndexInc: number;

    while (existingPropertyStartAt < existingProperties.length) {
        existingPropertyIndex = existingPropertyStartAt;
        const currProperty = existingProperties[existingPropertyIndex];

        effectIndexInc = ZERO;

        while (true) {
            effectIndex = effectIndexInc;

            if (mixerMapEffects.length <= effectIndex) {
                throw new Error("null1");
            }

            const currEffect = mixerMapEffects[effectIndex];
            const currEffectProperty = currEffect.property;
            const arePropertiesEqual = propertyEq(currEffectProperty, currProperty);

            if (arePropertiesEqual) {
                break;
            }

            effectIndexInc = effectIndex + 1;
        }

        const matchingEffect = mixerMapEffects[effectIndex];
        const point: Vector2 = {
            x: newPropDir.x * newPropMagnitude + matchingEffect.position.x,
            y: newPropDir.y * newPropMagnitude + matchingEffect.position.y,
        };
        const effectAtPoint = getEffectAtPoint(mixerMap, point);
        let effectAtPointProperty: Property | null = null;

        if (effectAtPoint !== null) {
            effectAtPointProperty = effectAtPoint.property;
        }

        if (effectAtPointProperty !== null) {
            const currEffectProperty = existingProperties[existingPropertyIndex];
            const newReaction: Reaction = {
                existing: currEffectProperty,
                output: effectAtPointProperty
            };

            reactionList.push(newReaction);
            existingPropertyStartAt = existingPropertyIndex + 1;
        } else {
            existingPropertyStartAt = existingPropertyIndex + 1;
        }
    }

    const newPropertyList: Property[] = [...existingProperties];
    for (const rxn of reactionList) {
        const newPropListContainsOutput = newPropertyList.some(prop => propertyEq(prop, rxn.output));

        if (!newPropListContainsOutput) {
            const indexOfExisting = newPropertyList.findIndex(prop => propertyEq(prop, rxn.existing));
            console.assert(indexOfExisting !== -1);

            newPropertyList[indexOfExisting] = rxn.output;
        }
    }

    const newListContainsNewProp = newPropertyList.some(prop => propertyEq(prop, newProperty));

    if (!newListContainsNewProp && newPropertyList.length < 8) {
        newPropertyList.push(newProperty);
    }

    return newPropertyList;
}

export function getEffectAtPoint(mixerMap: MixerMap, point: Vector2): Effect | null {
    const pointLen = len(point);
    const mapRadius = mixerMap.mapRadius;

    if (mapRadius < pointLen) {
        return null;
    }

    const effects = mixerMap.effects;
    let index = 0;

    do {
        if (effects.length <= index) {
            return null;
        }

        const currEffect = effects[index];
        const diff: Vector2 = {
            x: point.x - currEffect.position.x,
            y: point.y - currEffect.position.y,
        };
        const diffLen = len(diff);

        if (diffLen < currEffect.radius) {
            return effects[index];
        }

        index++;
    } while (true);
}

export function getNewEffect(
    mixerMap: MixerMap,
    effect: Effect,
    property: Property
): Effect | null {
    const dir = property.mixDirection;
    const scale = property.mixMagnitude;

    const point: Vector2 = {
        x: dir.x * scale + effect.position.x,
        y: dir.y * scale + effect.position.y,
    };
    const newEffect = getEffectAtPoint(mixerMap, point)

    return newEffect;
}

function len(v: Vector2): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function propertyEq(a: Property, b: Property): boolean {
    return a.id === b.id;
}