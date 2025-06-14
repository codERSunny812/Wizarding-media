
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Heart, MessageCircle, Clock, Download, Upload } from 'lucide-react';

interface AnalyticsData {
  followers: number[];
  engagement: Array<{
    post: number;
    likes: number;
    comments: number;
  }>;
  bestPostTime: string;
}

const InstagramAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - simulating what would come from MongoDB
  const mockData: AnalyticsData = {
    followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
    engagement: [
      { post: 1, likes: 320, comments: 25 },
      { post: 2, likes: 400, comments: 40 },
      { post: 3, likes: 290, comments: 10 },
      { post: 4, likes: 350, comments: 30 },
      { post: 5, likes: 380, comments: 35 }
    ],
    bestPostTime: "Wednesday 7 PM"
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalyticsData(mockData);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const followerGrowthData = analyticsData?.followers.map((count, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    followers: count
  })) || [];

  const engagementData = analyticsData?.engagement.map(item => ({
    ...item,
    totalEngagement: item.likes + item.comments,
    engagementRate: ((item.likes + item.comments) / 1400 * 100).toFixed(1) // assuming 1400 followers
  })) || [];

  const totalEngagement = analyticsData?.engagement.reduce((sum, item) => sum + item.likes + item.comments, 0) || 0;
  const averageEngagement = totalEngagement / (analyticsData?.engagement.length || 1);
  const currentFollowers = analyticsData?.followers[analyticsData.followers.length - 1] || 0;
  const followerGrowth = analyticsData ? analyticsData.followers[analyticsData.followers.length - 1] - analyticsData.followers[0] : 0;

  const handleUploadJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            setAnalyticsData(data);
          } catch (error) {
            console.error('Invalid JSON file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'instagram-analytics.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Instagram Analytics</h2>
          <p className="text-gray-600">Track your performance and optimize your content strategy</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleUploadJSON} className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload JSON</span>
          </Button>
          <Button variant="outline" onClick={handleExportData} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Followers</p>
                <p className="text-2xl font-bold">{currentFollowers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Weekly Growth</p>
                <p className="text-2xl font-bold">+{followerGrowth}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Engagement</p>
                <p className="text-2xl font-bold">{Math.round(averageEngagement)}</p>
              </div>
              <Heart className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Best Time</p>
                <p className="text-lg font-bold">{analyticsData?.bestPostTime}</p>
              </div>
              <Clock className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Growth Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Follower Growth (7 Days)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={followerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="url(#gradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#8b5cf6' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <span>Post Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="post" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => [value, name === 'likes' ? 'Likes' : 'Comments']}
                  />
                  <Bar dataKey="likes" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="comments" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Details */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Posts Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Post</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Likes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Comments</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total Engagement</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                {engagementData.map((item) => (
                  <tr key={item.post} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">Post {item.post}</td>
                    <td className="py-3 px-4 text-pink-600 font-medium">{item.likes}</td>
                    <td className="py-3 px-4 text-purple-600 font-medium">{item.comments}</td>
                    <td className="py-3 px-4 font-medium">{item.totalEngagement}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {item.engagementRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramAnalytics;
