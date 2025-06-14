
import React, { useState } from 'react';
import { Send, Sparkles, User, Zap, Copy, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ContentIdea {
  reelIdea: string;
  caption: string;
  hashtags: string[];
  hook: string;
}

const ContentIdeaAssistant = () => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<ContentIdea | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);
  const { toast } = useToast();

  const niches = [
    'Fashion', 'Fitness', 'Food', 'Travel', 'Tech', 'Beauty', 'Lifestyle', 'Education'
  ];

  const fetchAIContent = async (userTopic: string, userNiche: string): Promise<ContentIdea> => {
    const response = await fetch('https://wizarding-media-ok6l.onrender.com/api/v1/ai-response/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: userTopic, niche: userNiche }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch content from AI');
    }
  
    return response.json();
  };
  
  

  // handle submit button 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !niche) return;

    const userMessage = `Generate content ideas for "${topic}" in the ${niche} niche`;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const idea = await fetchAIContent(topic, niche);
      setGeneratedIdea(idea);
      setMessages(prev => [...prev, { type: 'assistant', content: 'I\'ve generated some fresh content ideas for you!' }]);
      
      toast({
        title: "Content ideas generated! ✨",
        description: "Your AI-powered content strategy is ready.",
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Content ready to paste anywhere.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Chat Interface */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>AI Content Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Messages */}
          <div className="space-y-4 mb-6 min-h-[200px]">
            {messages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                <p className="text-lg font-medium">Ready to create viral content?</p>
                <p>Tell me your topic and niche, and I'll generate amazing ideas!</p>
              </div>
            )}
            
            {/* chats section with the AI  */}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-green-400 to-blue-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Enter your topic (e.g., 'morning routine', 'budgeting tips')"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-white/50 border-white/20"
                  disabled={loading}
                />
              </div>
              <div>
                <Select value={niche} onValueChange={setNiche} disabled={loading}>
                  <SelectTrigger className="bg-white/50 border-white/20">
                    <SelectValue placeholder="Choose your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((n) => (
                      <SelectItem key={n} value={n.toLowerCase()}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={loading || !topic.trim() || !niche}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Content Ideas
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      {
      generatedIdea && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">🎬 Reel Idea</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{generatedIdea.reelIdea}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(generatedIdea.reelIdea)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Idea
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-pink-600">📝 Caption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{generatedIdea.caption}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(generatedIdea.caption)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Caption
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">🔥 Hook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 font-medium">{generatedIdea.hook}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(generatedIdea.hook)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Hook
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-green-600">#️⃣ Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {generatedIdea.hashtags.map((tag, index) => (
                  <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(generatedIdea.hashtags.join(' '))}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All Hashtags
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentIdeaAssistant;
