import { FlexMessage } from "@line/bot-sdk";

export const roomCreateFlex: FlexMessage = {
    type: "flex",
    altText: "人狼ゲームのカードメッセージ",
    contents: {
        type: "bubble",
        hero: {
            type: "image",
            url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
                type: "uri",
                label: "LINE公式サイト",
                uri: "https://line.me/"
            }
        },
        body: {
            type: "box",
            layout: "vertical",
            contents: [
                {
                    type: "text",
                    text: "人狼ゲーム",
                    weight: "bold",
                    size: "xl",
                    align: "center"
                },
                {
                    type: "box",
                    layout: "vertical",
                    margin: "lg",
                    spacing: "sm",
                    contents: [
                        {
                            type: "box",
                            layout: "baseline",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "text",
                                    wrap: true,
                                    color: "#666666",
                                    size: "sm",
                                    flex: 5,
                                    text: "人狼ゲームを開始します。「村を作成」を押してゲームルームを作成してください。"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
                {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                        type: "message",
                        label: "村を作成",
                        text: "@村を作成"
                    }
                }
            ],
            flex: 0
        }
    }
};