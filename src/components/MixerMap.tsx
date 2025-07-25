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
import React, { Fragment } from "preact";
import { MixerMap as MixerMapData, Effect, Property, Vector2 } from "../utils/types";
import { getEffectAtPoint, propertyEq } from "../utils/mix_calculator";

type MixerMapProps = {
    readonly mixerMap: MixerMapData;
    readonly padding: number;
    readonly scale: number;
    readonly existingProperties?: readonly Property[];
    readonly nextProperty?: Property;
    readonly onClickProperty?: (property: Property) => void;
};

type BoundingBox = {
    readonly xMin: number;
    readonly yMin: number;
    readonly xMax: number;
    readonly yMax: number;
};

type PropertyTransform = {
    readonly effect: Effect;
    readonly newPos: Vector2;
    readonly newProperty?: Property;
};

export const MixerMap: React.FunctionComponent<MixerMapProps> = ({
    mixerMap,
    padding,
    scale,
    existingProperties,
    nextProperty,
    onClickProperty,
}) => {
    const transforms = existingProperties && nextProperty ? getPropertyTransforms(
        mixerMap,
        existingProperties,
        nextProperty
    ) : undefined;
    const boundingBox = getBoundingBox(mixerMap.effects, padding, scale);
    const boxWidth = boundingBox.xMax - boundingBox.xMin;
    const boxHeight = boundingBox.yMax - boundingBox.yMin;
    const viewBox = `${boundingBox.xMin} ${boundingBox.yMin} ${boxWidth} ${boxHeight}`;

    return (
        <div className="mixer-map-container">
            <svg viewBox={viewBox} className="mixer-map">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="8"
                        markerHeight="8"
                        refX="6"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#bbb" />
                    </marker>
                </defs>
                {mixerMap.effects.map(effect => (
                    <Fragment key={effect.property.id}>
                        <circle
                            cx={effect.position.x * scale}
                            cy={effect.position.y * scale}
                            r={effect.radius * scale}
                            fill={transforms?.find(p => p.newProperty && propertyEq(p.newProperty, effect.property)) ? "#444" : "none"}
                            stroke={effect.property.labelColor}
                            stroke-width={1}
                            pointer-events="all"
                            onClick={() => onClickProperty?.(effect.property)}
                        />
                        <text
                            x={effect.position.x * scale}
                            y={effect.position.y * scale}
                            text-anchor="middle"
                            dominant-baseline="central"
                            fill={effect.property.labelColor}
                            pointer-events="none"
                        >
                            {effect.property.name}
                        </text>
                    </Fragment>
                ))}
                {transforms?.map(t => (
                    <line
                        key={t.effect.property.id + "-arrow"}
                        x1={t.effect.position.x * scale}
                        y1={t.effect.position.y * scale}
                        x2={t.newPos.x * scale}
                        y2={t.newPos.y * scale}
                        stroke="#bbb"
                        stroke-width={2}
                        marker-end="url(#arrowhead)"
                    />
                ))}
            </svg>
        </div>
    );
};

function getPropertyTransforms(
    mixerMap: MixerMapData,
    existingProperties: readonly Property[],
    nextProperty: Property
): PropertyTransform[] {
    const dir = nextProperty.mixDirection;
    const scale = nextProperty.mixMagnitude;
    const transforms: PropertyTransform[] = [];

    for (const prop of existingProperties) {
        const effect = mixerMap.effects.find(effect => propertyEq(effect.property, prop));

        if (!effect) {
            throw new Error(`Unexpected property: ${prop}`);
        }

        const point: Vector2 = {
            x: dir.x * scale + effect.position.x,
            y: dir.y * scale + effect.position.y,
        };
        const newEffect = getEffectAtPoint(mixerMap, point);

        transforms.push({
            effect,
            newPos: point,
            newProperty: newEffect?.property
        });
    }

    return transforms;
}

function getBoundingBox(effects: readonly Effect[], padding = 0, scale = 1): BoundingBox {
    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;

    for (const effect of effects) {
        const pos = effect.position;
        const r = effect.radius;

        if (pos.x - r < xMin) {
            xMin = pos.x - r;
        }

        if (pos.y - r < yMin) {
            yMin = pos.y - r;
        }

        if (pos.x + r > xMax) {
            xMax = pos.x + r;
        }

        if (pos.y + r > yMax) {
            yMax = pos.y + r;
        }
    }

    return {
        xMin: xMin * scale - padding,
        yMin: yMin * scale - padding,
        xMax: xMax * scale + padding,
        yMax: yMax * scale + padding,
    };
}