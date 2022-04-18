interface UserSearchBody {
  id: string;
  name: string;
  username: string;
  email: string;
}

interface UserSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: UserSearchBody;
    }>;
  };
}

export { UserSearchBody, UserSearchResult };
