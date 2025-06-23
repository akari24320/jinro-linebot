import { FlexMessage, FlexBubble, FlexButton, FlexBox, FlexText } from "@line/bot-sdk";
import { Role } from "../patterns";

const PATTERNS_PER_BUBBLE = 4;

export function rolePatternSelectFlex(patterns: Role[][]): FlexMessage {
    const bubbles: FlexBubble[] = [];
    for (let i = 0; i < patterns.length; i += PATTERNS_PER_BUBBLE) {
        const group = patterns.slice(i, i + PATTERNS_PER_BUBBLE);

        // body: パターン名＋役職
        const bodyContents: FlexText[] = group.flatMap((pattern, idx) => [
            {
                type: "text" as const,
                text: `パターン${i + idx + 1}`,
                weight: "bold",
                size: "md",
                margin: idx === 0 ? "none" : "md"
            },
            {
                type: "text" as const,
                text: pattern.join("、"),
                size: "sm",
                margin: "sm"
            }
        ]);

        // footer: 各パターンのボタン
        const footerContents: FlexButton[] = group.map((_, idx) => ({
            type: "button" as const,
            action: {
                type: "postback" as const,
                label: `パターン${i + idx + 1}で開始`,
                data: `ROLE_PATTERN_SELECT_${i + idx}`
            },
            style: "primary",
            margin: (idx === 0 ? "none" : "sm")
        }));

        bubbles.push({
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: bodyContents
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: footerContents
            }
        });
    }

    return {
        type: "flex",
        altText: "配役パターンを選んでください",
        contents: {
            type: "carousel",
            contents: bubbles
        }
    };
}