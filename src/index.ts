import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro/common";

const RADIUS_PROPS = new Set([
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderTopStartRadius",
    "borderTopEndRadius",
    "borderBottomStartRadius",
    "borderBottomEndRadius",
]);

let unpatch: (() => void) | null = null;

export const onLoad = () => {
    const styleUtils = findByProps("getStyleProp");

    if (!styleUtils?.getStyleProp) {
        console.error("[NopeRounding] getStyleProp not found");
        return;
    }

    unpatch = after(
        "NopeRounding",
        styleUtils,
        "getStyleProp",
        (_this, args, result) => {
            if (RADIUS_PROPS.has(args[1])) {
                return 0;
            }

            return result;
        },
    );

    console.log("[NopeRounding] Loaded!");
};

export const onUnload = () => {
    unpatch?.();
    unpatch = null;

    console.log("[NopeRounding] Unloaded!");
};
