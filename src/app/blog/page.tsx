// import React from "react";
// import { DEMO_POSTS } from "@/data/posts";
// import SectionAds from "./SectionAds";
// import SectionMagazine5 from "./SectionMagazine5";
// import SectionLatestPosts from "./SectionLatestPosts";
// import BgGlassmorphism from "@/components/BgGlassmorphism";
// import SectionSubscribe2 from "@/components/SectionSubscribe2";

// // DEMO DATA
// const POSTS = DEMO_POSTS;

// // DEMO POST FOR MAGAZINE SECTION
// const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
// //

// const BlogPage: React.FC = () => {
//   return (
//     <div className="nc-BlogPage overflow-hidden relative">
//       {/* ======== BG GLASS ======== */}
//       <BgGlassmorphism />
//       {/* ======== ALL SECTIONS ======== */}
//       {/* ======= START CONTAINER ============= */}
//       <div className="container relative">
//         {/* === SECTION 1 === */}
//         <div className="pt-12 pb-16 lg:pb-28">
//           <SectionMagazine5 posts={MAGAZINE1_POSTS} />
//         </div>

//         {/* === SECTION 1 === */}
//         {/* <SectionAds /> */}

//         {/* === SECTION 8 === */}
//         <SectionLatestPosts className="py-16 lg:py-28" />

//         {/* === SECTION 1 === */}
//         <SectionSubscribe2 className="pb-16 lg:pb-28" />
//       </div>
//     </div>
//   );
// };

// export default BlogPage;
"use client";
import React, { useEffect, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import axios from "axios";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/latestblog");
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(posts, "Post will render here");

  if (loading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            Loading...
            <RiLoader4Fill className="animate-spin text-lg" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <BgGlassmorphism />
      <div className="container relative">
        <div className="pt-12 pb-4 lg:pb-28">
          <SectionMagazine5 posts={posts.slice(0, 4)} />
        </div>
        <SectionLatestPosts />
      </div>
    </div>
  );
};

export default BlogPage;
