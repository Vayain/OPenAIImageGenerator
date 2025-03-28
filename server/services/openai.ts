import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Enhances a user prompt for better image generation results
 * 
 * @param userPrompt The original user prompt
 * @returns Enhanced prompt with more details
 */
export async function enhancePromptWithGPT4o(userPrompt: string): Promise<string> {
  try {
    // Use GPT-4o to enhance the prompt
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system", 
          content: "You are an expert at creating detailed prompts for image generation. Your task is to enhance user prompts with more descriptive details that will help create stunning, high-quality images. Maintain the original intent and theme, but add artistic direction, style references, lighting details, and scene composition. Keep the enhanced prompt under 400 characters. Return only the enhanced prompt without explanations or formatting."
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Return the enhanced prompt
    return response.choices[0].message.content || userPrompt;
  } catch (error) {
    console.error('Error enhancing prompt with GPT-4o:', error);
    // Return the original prompt if enhancement fails
    return userPrompt;
  }
}

/**
 * Generates an image using OpenAI's DALL-E 3 model based on the provided prompt
 * 
 * @param prompt User's text prompt for image generation
 * @returns URL to the generated image
 */
export async function generateImage(prompt: string): Promise<string> {
  try {
    // First enhance the prompt using GPT-4o for better results
    const enhancedPrompt = await enhancePromptWithGPT4o(prompt);
    
    // Make API call to OpenAI for image generation with the enhanced prompt
    const response = await openai.images.generate({
      model: "dall-e-3", // Using DALL-E 3 for image generation
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    // Return the URL of the generated image
    return response.data[0].url || '';
  } catch (error) {
    console.error('Error generating image with OpenAI:', error);
    throw new Error('Failed to generate image');
  }
}