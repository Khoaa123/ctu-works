"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface NewsItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function NewsDetail() {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/news/get-detail-news/${id}`
        );
        const data = await res.json();
        if (data.status === "OK") {
          setNewsItem(data.data);
        } else {
          console.error("Failed to fetch news item");
        }
      } catch (error) {
        console.error("Error fetching news item", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pt-8">
      <article className="w-full">
        <h1 className="mb-4 text-3xl font-bold">{newsItem?.title}</h1>
        <div className="mb-4 border border-l-0 border-r-0 border-t-0 border-solid border-b-teal-200 pb-5 text-sm text-gray-600">
          <span>Lượt xem: {newsItem?.views}</span>
          <span className="mx-2">|</span>
          <span>
            {newsItem ? new Date(newsItem.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
        <p className="mb-6 text-xl font-semibold">{newsItem?.summary}</p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem?.content || "" }}
        />
      </article>
    </div>
  );
}
