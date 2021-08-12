export default interface IMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export type MessageBody = Omit<IMessage, "id">;