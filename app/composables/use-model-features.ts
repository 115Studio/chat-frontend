import { AiModel } from '../constants/ai-model'
import { AiModelFeature } from '../constants/ai-model-feature'

export const useModelFeatures = (model: AiModel): AiModelFeature[] => {
  switch (model) {
    // OpenAI models
    case AiModel.OpenaiGpt4o:
      return [AiModelFeature.TextGen, AiModelFeature.Vision]
    case AiModel.OpenaiGptO4Mini:
      return [AiModelFeature.TextGen, AiModelFeature.Vision]
    case AiModel.OpenaiGpt4oMini:
      return [AiModelFeature.TextGen, AiModelFeature.Vision]
    case AiModel.OpenaiGpt4Turbo:
      return [AiModelFeature.TextGen]
    case AiModel.OpenaiGpt4:
      return [AiModelFeature.TextGen]
    case AiModel.OpenaiGpt35Turbo:
      return [AiModelFeature.TextGen]

    // Anthropic Claude models
    case AiModel.AnthropicClaudeOpus4:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning, AiModelFeature.ReasoningControl]
    case AiModel.AnthropicClaudeSonnet4:
      return [AiModelFeature.TextGen, AiModelFeature.Vision, AiModelFeature.PdfScan, AiModelFeature.Reasoning, AiModelFeature.ReasoningControl]
    case AiModel.AnthropicClaudeSonnet37:
      return [AiModelFeature.TextGen, AiModelFeature.Vision, AiModelFeature.PdfScan, AiModelFeature.Reasoning, AiModelFeature.ReasoningControl]
    case AiModel.AnthropicClaudeSonnet35V2:
      return [AiModelFeature.TextGen, AiModelFeature.Vision, AiModelFeature.PdfScan]
    case AiModel.AnthropicClaudeSonnet35:
      return [AiModelFeature.TextGen, AiModelFeature.Vision, AiModelFeature.PdfScan]
    case AiModel.AnthropicClaudeHaiku35:
      return [AiModelFeature.TextGen]
    case AiModel.AnthropicClaudeOpus3:
      return [AiModelFeature.TextGen]
    case AiModel.AnthropicClaudeHaiku3:
      return [AiModelFeature.TextGen]

    // Google Gemini models
    case AiModel.GoogleGemini20Flash:
      return [AiModelFeature.TextGen, AiModelFeature.PdfScan, AiModelFeature.Vision]
    case AiModel.GoogleGemini20FlashLite:
      return [AiModelFeature.TextGen, AiModelFeature.PdfScan, AiModelFeature.Vision]
    case AiModel.GoogleGemini25Flash:
      return [AiModelFeature.TextGen, AiModelFeature.PdfScan, AiModelFeature.Vision]
    case AiModel.GoogleGemini15Flash:
      return [AiModelFeature.TextGen, AiModelFeature.Vision]
    case AiModel.GoogleGeminiPro:
      return [AiModelFeature.TextGen, AiModelFeature.PdfScan, AiModelFeature.Vision]

    // Groq models
    case AiModel.GroqLlama31:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.GroqLlama38b:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.GroqMixtral:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    // Mistral models
    case AiModel.MistralSmall31:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.MistralLarge:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.MistralNemo:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    // Cerebras models
    case AiModel.CerebrasLlama33:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.CerebrasLlama31:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    // DeepSeek models
    case AiModel.DeepseekCoder:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.DeepseekChat:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    // Perplexity models
    case AiModel.PerplexityLlama31Sonar:
      return [AiModelFeature.TextGen, AiModelFeature.WebSearch, AiModelFeature.Reasoning]
    case AiModel.PerplexityLlama31SonarSmall:
      return [AiModelFeature.TextGen, AiModelFeature.WebSearch, AiModelFeature.Reasoning]

    // Cohere models
    case AiModel.CohereCommandR:
      return [AiModelFeature.TextGen, AiModelFeature.WebSearch, AiModelFeature.Reasoning]
    case AiModel.CohereCommandRPlus:
      return [AiModelFeature.TextGen, AiModelFeature.WebSearch, AiModelFeature.Reasoning]

    // Workers AI models (Ollama equivalent)
    case AiModel.WorkersAiLlama31:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.WorkersAiLlama33:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]
    case AiModel.WorkersAiLlama4Scout:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    // Grok models
    case AiModel.GrokBeta:
      return [AiModelFeature.TextGen, AiModelFeature.Reasoning]

    default:
      return []
  }
}
