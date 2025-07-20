import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const systemPrompt = `You are an AI hiring assistant for SkillSync, a platform connecting students with startup opportunities. 

Context: ${context || "General hiring assistance"}

You help with:
- Analyzing candidate profiles and job matches
- Providing hiring recommendations
- Optimizing job descriptions
- Market intelligence insights
- Interview preparation
- Salary negotiations
- Career guidance

Be helpful, professional, and data-driven in your responses. Use emojis appropriately and provide actionable insights.`

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
