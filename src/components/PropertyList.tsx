import React from "preact";
import type { Property } from "../utils/types";
import { PropertyChip } from "./PropertyChip";
import { propertyEq } from "../utils/mix_calculator";
import { useCallback } from "preact/hooks";

type PropertyListProps = {
    readonly properties: readonly Property[];
    readonly withDummy?: boolean;
};

type PropertyDiffListProps = {
    readonly oldProperties: readonly Property[];
    readonly newProperties: readonly Property[];
    readonly withDummy?: boolean;
};

export const PropertyList: React.FunctionComponent<PropertyListProps> = ({
    properties,
    withDummy
}) => {
    return (
        <div className="property-list">
            {properties.map(property => (
                <PropertyChip
                    property={property}
                />
            ))}
            {withDummy && <div className="property-chip dummy" />}
        </div>
    );
};

export const PropertyDiffList: React.FunctionComponent<PropertyDiffListProps> = ({
    oldProperties,
    newProperties,
    withDummy
}) => {
    const zippedProps = zip(oldProperties, newProperties);

    const getPropertyRow = useCallback((
        oldProp: Property | undefined,
        newProp: Property | undefined,
        i: number
    ) => {
        if (zippedProps.length === 1 && !oldProp && newProp) {
            return (
                <div className="property-diff-list">
                    <div key={0} className="property-diff-row">
                        <PropertyChip property={newProp} />
                    </div>
                </div>
            );
        }

        let oldPropElement = <div className="property-chip dummy" />;
        let connector: string | undefined;
        let newPropElement = <div className="property-chip dummy" />;

        if (oldProp) {
            oldPropElement = <PropertyChip property={oldProp} />;
        }

        if (newProp) {
            if (!oldProp || !propertyEq(oldProp, newProp)) {
                newPropElement = <PropertyChip property={newProp} />;

                if (!oldProp) {
                    connector = "+";
                } else {
                    connector = "⟶";
                }
            }
        }

        return (
            <div key={i} className="property-diff-row">
                {oldPropElement}
                <div className="connector">
                    {connector}
                </div>
                {newPropElement}
            </div>
        );
    }, [zippedProps]);

    return (
        <div className="property-diff-list">
            {zippedProps.map(([oldProp, newProp], i) => getPropertyRow(
                oldProp,
                newProp,
                i
            ))}
            {withDummy && (
                <div>
                    <div className="property-chip dummy" />
                </div>
            )}
        </div>
    );
}

function zip<T>(xs: readonly T[], ys: readonly T[]): [x?: T, y?: T][] {
    const out: [x?: T, y?: T][] = [];

    for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
        out[i] = [xs[i], ys[i]];
    }

    return out;
}