"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import debounce from "lodash.debounce";
import Link from "next/link";
import Input from "@/shared/Input";
import { RiLoader4Fill } from "react-icons/ri";
import { Route } from "next";
import Heading from "@/shared/Heading";

const SectionLatestPosts = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchBlogs = async (search = "", page = 1) => {
    setLoading(true);
    setSearching(true);
    try {
      const response = await axios.get(
        `/api/blog/getblog?search=${search}&page=${page}`
      );
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const debouncedFetchBlogs = useCallback(
    debounce((query) => {
      fetchBlogs(query, 1);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedFetchBlogs(searchTerm);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm, debouncedFetchBlogs]);

  useEffect(() => {
    fetchBlogs(searchTerm, currentPage);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RiLoader4Fill className="animate-spin text-xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>;
  }

  return (
    <div className="pb-2">
      <Heading>Latest blogs</Heading>
      <div className="flex w-full items-center">
        <Input
          type="text"
          ref={searchInputRef}
          placeholder="Search by tag..."
          className="max-w-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      {searching ? (
        <div className="text-center mt-4">Searching...</div>
      ) : (
        <div className="flex mt-4 flex-col gap-y-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className=" py-2 rounded-lg" key={blog._id}>
                <div className="">
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <div>
                      <Link href={`/blog/${blog._id}` as Route}>
                        <div className="hover:opacity-70 cursor-pointer">
                          <h1 className="sm:text-xl ml-2 mt-1 line-clamp-1 text-lg p-0 font-semibold">
                            {blog.title}
                          </h1>
                          <p className="sm:text-base ml-2 line-clamp-2 max-w-4xl text-sm">
                            {blog.maintext}
                          </p>
                        </div>
                      </Link>

                      <div className="ml-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="line-clamp-1 opacity-60 sm:text-sm text-xs mt-4">
                              {format(
                                new Date(blog.createdAt),
                                "MMMM dd, yyyy"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <div className="mt-2 flex flex-wrap gap-2 flex-grow">
                            {blog.tags
                              .slice(0, 3)
                              .map((tag: any, index: any) => (
                                <span
                                  key={index}
                                  className="text-xs border opacity-40 rounded-lg px-2 py-1"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <img
                        className="w-40 rounded-lg object-cover"
                        src={blog.banner}
                        alt="Blog Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No blogs found</div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <p className="text-xs">
            Page <span className="text-primary">{currentPage}</span> out of
            <span className="text-primary ml-2">{totalPages}</span>
          </p>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`flex items-center justify-center ${
              currentPage <= 1
                ? "opacity-50 cursor-not-allowed  border rounded-full h-8 w-8 bg-primary "
                : "cursor-pointer border rounded-full h-8 w-8 bg-primary "
            }`}
          >
            <GrFormPrevious className="h-4 w-4" />
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`flex items-center justify-center ${
              currentPage >= totalPages
                ? "opacity-50 cursor-not-allowed  border rounded-full h-8 w-8 bg-primary "
                : "cursor-pointer border rounded-full h-8 w-8 bg-primary "
            }`}
          >
            <MdOutlineNavigateNext className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
