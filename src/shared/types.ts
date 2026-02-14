export type Id = number;

export type Question = {
  id: Id;
  text: string;
  topicName: string;
  code: string;
};

export type MessageResponse = {
  id: Id;
  authorId: string;
  body: string;
  sentAt: string;
  type: string;
  username: string;
};
