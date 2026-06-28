"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { format } from "date-fns";
import NewsActions from "@/components/admin/NewsActions";
import EventActions from "@/components/admin/EventActions";
import Link from "next/link";
import { MdArticle, MdEvent } from "react-icons/md";

interface NewsEventsTabsProps {
  news: any[];
  events: any[];
}

export default function NewsEventsTabs({ news, events }: NewsEventsTabsProps) {
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("news")}
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "news"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <MdArticle size={20} />
          News ({news.length})
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "events"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <MdEvent size={20} />
          Events ({events.length})
        </button>
      </div>

      {/* News Tab Content */}
      {activeTab === "news" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No news articles yet.{" "}
                      <Link
                        href="/admin/news/new"
                        className="text-primary hover:underline"
                      >
                        Create your first one!
                      </Link>
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            item.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(item.created_at), "dd-MMM-yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        <NewsActions newsId={item.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Events Tab Content */}
      {activeTab === "events" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No events yet.{" "}
                      <Link
                        href="/admin/events/new"
                        className="text-primary hover:underline"
                      >
                        Create your first one!
                      </Link>
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{event.title}</td>
                      <td className="py-3 px-4">
                        {format(new Date(event.date), "dd-MMM-yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            event.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <EventActions eventId={event.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

