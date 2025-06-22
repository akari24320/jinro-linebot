import { FlexMessage } from "@line/bot-sdk";

export const roomJoinFlex: FlexMessage = {
    type: "flex",
    altText: "人狼ゲームのカードメッセージ",
    contents: {
        type: "bubble",
        hero: {
            type: "image",
            url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:5",
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
                    text: "村が出来た！",
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
                                    text: "村が出来ました！「参加」を押して入村してください。"
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
                        label: "参加",
                        text: "@参加"
                    }
                }
            ],
            flex: 0
        }
    }
};