import { FlexMessage, FlexContainer } from "@line/bot-sdk";
import { Role } from "../patterns";

export function rolePatternSelectFlex(patterns: Role[][]): FlexMessage {
    const carousel: FlexContainer = {
        type: "carousel",
        contents: patterns.map((pattern, idx) => ({
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    { type: "text", text: `パターン${idx + 1}`, weight: "bold", size: "lg" },
                    { type: "text", text: pattern.join("、"), margin: "md" }
                ]
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "postback",
                            label: "このパターンで開始",
                            data: `ROLE_PATTERN_SELECT_${idx}`
                        },
                        style: "primary"
                    }
                ]
            }
        }))
    };

    return {
        type: "flex",
        altText: "配役パターンを選んでください",
        contents: carousel
    };
}