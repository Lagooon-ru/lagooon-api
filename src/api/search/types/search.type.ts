type UserSearchBody = {
  id: string;
  name: string;
  username: string;
};

type UserSearchResult = {
  hits: {
    total: number;
    hits: { _source: UserSearchBody }[];
  };
};

export { UserSearchResult, UserSearchBody };
