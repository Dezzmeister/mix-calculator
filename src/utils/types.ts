export interface Vector2 {
    readonly x: number;
    readonly y: number;
}

export interface Property {
    readonly name: string;
    readonly id: string;
    readonly labelColor: string;
    readonly mixDirection: Vector2;
    readonly mixMagnitude: number;
}

export interface Effect {
    readonly position: Vector2;
    readonly radius: number;
    readonly property: Property;
}

export interface MixerMap {
    readonly mapRadius: number;
    readonly effects: readonly Effect[];
}

export interface Reaction {
    readonly existing: Property;
    readonly output: Property;
}

export interface MixIngredient {
    readonly name: string;
    readonly property: Property;
}

export interface DataModel {
    readonly mixerMap: MixerMap;
    readonly mixIngredients: readonly MixIngredient[];
    readonly allProperties: readonly Property[];
}