import { subDays } from "date-fns";
import { Post } from "./store";

export const today: Post = {
  id: "1",
  title: "Today",
  created: new Date(),
};

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: subDays(new Date(), 2),
};

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: subDays(new Date(), 12),
};
