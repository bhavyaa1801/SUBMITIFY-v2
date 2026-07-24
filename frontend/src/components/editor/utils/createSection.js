import { defaultSectionStyle } from "../theme/defaultSectionStyle";

export function createSection(type, title) {
    return {
        title,
        type,
        content: "",
        style: structuredClone(defaultSectionStyle),
    };
}