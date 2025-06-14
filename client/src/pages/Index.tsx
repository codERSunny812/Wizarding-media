import React, { useState } from "react";
import ContentIdeaAssistant from "../components/ContentIdeaAssistant";
import InstagramAnalytics from "../components/InstagramAnalytics";
import { Sparkles, BarChart3 } from "lucide-react";
import ProtectedRoute from "../utils/ProctectedRoute";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"ideas" | "analytics">("ideas");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creator Platform
              </h1>
            </div>
            <div className="flex space-x-1 bg-white/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("ideas")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === "ideas"
                    ? "bg-white shadow-sm text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI Ideas
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === "analytics"
                    ? "bg-white shadow-sm text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "ideas" ? (
          <ContentIdeaAssistant />
        ) : (
          <ProtectedRoute>
            <InstagramAnalytics />
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
};

export default Index;
