import { messagingApi } from "@line/bot-sdk";

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_MESSAGING_ACCESS_TOKEN!,
});

export async function pushMessage(lineUserId: string, messages: messagingApi.Message[]) {
  return client.pushMessage({
    to: lineUserId,
    messages,
  });
}

export async function pushTextMessage(lineUserId: string, text: string) {
  return pushMessage(lineUserId, [{ type: "text", text }]);
}

export async function pushFlexMessage(
  lineUserId: string,
  altText: string,
  contents: messagingApi.FlexContainer
) {
  return pushMessage(lineUserId, [
    { type: "flex", altText, contents },
  ]);
}

export { client as lineClient };
