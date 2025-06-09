/*
* Websocket operation codes are used only for server-to-client communication.
* */
export enum WebSocketOpCode {
  ForceClientRefresh = 1000,
  UserSettingsUpdate,
  UserPlanUpdate,

  MessageCreate = 10100,
  MessageUpdate,
  MessageComplement,
  MessageDelete,

  ChannelCreate = 10110,
  ChannelUpdate,
  ChannelDelete,
}
