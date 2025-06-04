"use client";

import dynamic from "next/dynamic";

// Import ChatButton secara dinamis dengan ssr: false di client component
const ChatButton = dynamic(() => import("./ChatButton"), { 
  ssr: false,
  loading: () => null 
});

export default function ChatbotWrapper() {
  return <ChatButton />;
} 