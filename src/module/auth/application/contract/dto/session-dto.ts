export type SessionDTO = {
  id: string;
  user: {
    id: string;
    name: string;
    permissions: string[];
  };
};
