import React from 'react'
import { Skeleton } from "@nextui-org/react";


const LeaderBoardSkeleton = () => {
  return (
    <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8 container items-center flex flex-col justify-center">
      <div className="mb-4 container  flex justify-center flex-col items-center w-full ">
        <div className=" flex justify-center w-full  ">
          <h1 className="text-4xl font-medium text-center py-16 dark:text-white">
            Leaderboard Rankings
          </h1>
        </div>
      </div>

      <div className="container items-center flex flex-col gap-6">
        <Skeleton className="rounded-lg w-[100px]">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex flex-wrap justify-between gap-4">
          <Skeleton className=" flex-grow flex-shrink flex-basis-[200px] h-[100px] w-[200px]    overflow-hidden  rounded-2lg  flex flex-col gap-4 p-8"></Skeleton>
          <Skeleton className=" flex-grow flex-shrink flex-basis-[200px] h-[100px] w-[200px]    overflow-hidden  rounded-2lg  flex flex-col gap-4 p-8"></Skeleton>
          <Skeleton className=" flex-grow flex-shrink flex-basis-[200px] h-[100px] w-[200px]    overflow-hidden  rounded-2lg  flex flex-col gap-4 p-8"></Skeleton>
          <Skeleton className=" flex-grow flex-shrink flex-basis-[200px] h-[100px] w-[200px]    overflow-hidden  rounded-2lg  flex flex-col gap-4 p-8"></Skeleton>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full items-center">
        <div className="flex gap-4 items-center">
          <Skeleton className="w-[100px] h-[25px] rounded-lg"></Skeleton>
          <Skeleton className="w-[100px] h-[25px] rounded-lg"></Skeleton>
          <Skeleton className="w-[100px] h-[25px] rounded-lg"></Skeleton>
        </div>
        <Skeleton className="w-full h-[250px] rounded-lg"></Skeleton>
      </div>
    </section>
  );
}

export default LeaderBoardSkeleton