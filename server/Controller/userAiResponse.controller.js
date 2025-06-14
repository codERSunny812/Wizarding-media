import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({ token: process.env.CO_API_KEY });

export const AiResponse = async (req, res) => {
    try {
        const { topic, niche } = req.body;

        if (!topic || !niche) {
            return res.status(400).json({ error: 'Topic and niche are required' });
        }

        const prompt = `
      Generate a creative content idea including:
      - Reel Idea
      - Caption
      - Hook
      - 5 relevant hashtags
      
      Topic: "${topic}"
      Niche: "${niche}"
      
      Format the output as JSON like this:
      {
        "reelIdea": "...",
        "caption": "...",
        "hook": "...",
        "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
      }
    `;

        const response = await cohere.generate({
            model: 'command-xlarge',
            prompt: prompt,
            max_tokens: 300,
            temperature: 0.7,
            stop_sequences: ["}"],
        });

        console.log(response)

        let text = response.generations[0].text.trim();

        // Sometimes the output is missing the closing } because of stop sequence, add it if needed
        if (!text.endsWith('}')) {
            text += '}';
        }

        // Parse the JSON from the text
        const idea = JSON.parse(text);

        console.log(idea)

        res.json(idea);

    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
}