"use client";
import { useEffect, useState } from "react";
import Post from "@/components/post";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import AppContainer from "@/layout/app-container";
import { GET_POSTS } from "@/graphql/queries";
import HomeTopBar from "@/components/home-top-bar";
import PostSkeleton from "@/components/skeletons/post-skeleton";
import { IPost } from "@/types/types";

var localizedFormat = require("dayjs/plugin/localizedFormat");

// ----------------------------------------------------------------------------

dayjs.extend(localizedFormat);

const HomeView = () => {
  const [selecetedCategory, setSelectedCategory] = useState();

  const { loading, data, refetch } = useQuery(GET_POSTS);

  useEffect(() => {
    refetch({ categoryId: parseInt(selecetedCategory!) });
  }, [selecetedCategory, refetch]);

  const handleSelectedCategory = (id: any) => {
    setSelectedCategory(id!);
  };
  const handleReset = () => {
    refetch({ categoryId: null });
  };

  return (
    <AppContainer isController={false}>
      {loading ? (
        [...Array(4)].map((_, index: number) => <PostSkeleton key={index} />)
      ) : (
        <div className="flex flex-col gap-3">
          <HomeTopBar
            onSelectedCategory={handleSelectedCategory}
            onReset={handleReset}
          />

          {data?.posts.length === 0 ? (
            <div>No Data Found.</div>
          ) : (
            data?.posts.map((item: IPost) => (
              <Post
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                commentCount={item.commentCount}
                author={item.author.firstName + " " + item.author.lastName}
                createdAt={item.createdAt}
                profilePic={item.author.profilePic}
              />
            ))
          )}
        </div>
      )}
    </AppContainer>
  );
};

export default HomeView;
