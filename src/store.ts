import { readonly } from "vue";
import axios from "axios";

export interface Post {
  id: string;
  title: string;
  created: Date;
}

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];

  all: Map<string, Post>;

  loaded: boolean;
}

class Store {
  private state: State;

  constructor(initial: State) {
    this.state = initial;
  }

  getState(): State {
    return readonly(this.state) as State;
  }

  async fetchPosts(): Promise<void> {
    const response = await axios.get<Post[]>("/posts");
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };
    for (const post of response.data) {
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }
    this.state.posts = postsState;
  }
}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
});

// This one called "composables" within the vue community, with accepted convention to start with prefix "use".
// We will replace this with "provide inject" later on.
export function useStore() {
  return store;
}
