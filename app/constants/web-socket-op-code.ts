/*
* Websocket operation codes are used for server-to-client and client-to-server communication.
* */
export enum WebSocketOpCode {
  Heartbeat,
  ForceClientRefresh = 1000,
  UserSettingsUpdate,
  UserPlanUpdate,

  MessageCreate = 10100,
  MessageUpdate,
  MessageComplement,
  MessageStageUpdate,
  MessageDelete,

  ChannelCreate = 10110,
  ChannelUpdate,
  ChannelDelete,
}
