import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yo9qaj4j",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: "/studio",
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});
