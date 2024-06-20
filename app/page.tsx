import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";

const baseFieldsNoContent = `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _createdAt)
`;

export const homePageQuery = groq`*[_type == "settings" ][0]{
  "featuredCourse": *[_type == "course" && featured > 0]|order(featured desc)[0]{
      ${baseFieldsNoContent},
  },
  "latestCourses": *[_type == "course"]|order(date desc)[0...4]{
      ${baseFieldsNoContent},
  },
  "latestPodcast": *[_type == "podcast"]|order(date desc)[0]{
      ${baseFieldsNoContent},
  },
  "topPodcasts": *[_type == "podcast" && views > 0]|order(views desc)[0...4]{
      ${baseFieldsNoContent},
  },
  "latestPosts": *[_type == "post"]|order(date desc)[0...4]{
     ${baseFieldsNoContent},
  },
  "topPosts": *[_type == "post" && views > 0]|order(views desc)[0...4]{
    ${baseFieldsNoContent},
  },
}`;

export default async function Home() {
  const [homePage] = await Promise.all([
    sanityFetch<any>({
      query: homePageQuery,
    }),
  ]);
  console.log(homePage);
  return (
    <div className="grid grid-flow-row gap-8">
      <div className="grid grid-flow-row gap-2">
        <div>Featured Course</div>
        <div>{JSON.stringify(homePage?.featuredCourse, null, 2)}</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div>Latest Courses</div>
        <div>{JSON.stringify(homePage?.latestCourses, null, 2)}</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div>Latest Podcast</div>
        <div>{JSON.stringify(homePage?.latestPodcast, null, 2)}</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div>Top Podcasts</div>
        <div>{JSON.stringify(homePage?.topPodcasts, null, 2)}</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div>Latest Posts</div>
        <div>{JSON.stringify(homePage?.latestPosts, null, 2)}</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div>Top Posts</div>
        <div>{JSON.stringify(homePage?.topPosts, null, 2)}</div>
      </div>
    </div>
  );
}
