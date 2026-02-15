export type Id = number;

export type AdminTabsKey = 'users' | 'messages';

export type Question = {
  id: Id;
  text: string;
  topicName: string;
  code: string;
};
