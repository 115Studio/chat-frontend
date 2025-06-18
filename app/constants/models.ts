import OpenAi from '@app/components/icons/OpenAi.vue'
import Claude from '@app/components/icons/Claude.vue'
import Gemini from '@app/components/icons/Gemini.vue'
import Groq from '@app/components/icons/Groq.vue'
import Mistral from '@app/components/icons/Mistral.vue'
import Cerebras from '@app/components/icons/Cerebras.vue'
import DeepSeek from '@app/components/icons/DeepSeek.vue'
import Perplexity from '@app/components/icons/Perplexity.vue'
import Cohere from '@app/components/icons/Cohere.vue'
import Grok from '@app/components/icons/Grok.vue'
import Ollama from '@app/components/icons/Ollama.vue'
import { AiModel } from '@app/constants/ai-model'
import { useModelFeatures } from '@app/composables/use-model-features'

export const models = [
  {
    name: 'OpenAI',
    icon: OpenAi,
    variants: [
      { name: 'GPT-4o',         id: AiModel.OpenaiGpt4o,         features: useModelFeatures(AiModel.OpenaiGpt4o) },
      { name: 'GPT-o4 Mini',    id: AiModel.OpenaiGptO4Mini,     features: useModelFeatures(AiModel.OpenaiGptO4Mini) },
      { name: 'GPT-4o Mini',    id: AiModel.OpenaiGpt4oMini,     features: useModelFeatures(AiModel.OpenaiGpt4oMini) },
      { name: 'GPT-4 Turbo',    id: AiModel.OpenaiGpt4Turbo,     features: useModelFeatures(AiModel.OpenaiGpt4Turbo) },
      { name: 'GPT-4',          id: AiModel.OpenaiGpt4,          features: useModelFeatures(AiModel.OpenaiGpt4) },
      { name: 'GPT-3.5 Turbo',  id: AiModel.OpenaiGpt35Turbo,    features: useModelFeatures(AiModel.OpenaiGpt35Turbo) },
    ],
  },
  {
    name: 'Claude',
    icon: Claude,
    variants: [
      { name: 'Opus 4',           id: AiModel.AnthropicClaudeOpus4,      features: useModelFeatures(AiModel.AnthropicClaudeOpus4) },
      { name: 'Sonnet 4',         id: AiModel.AnthropicClaudeSonnet4,    features: useModelFeatures(AiModel.AnthropicClaudeSonnet4) },
      { name: 'Sonnet 3.7',       id: AiModel.AnthropicClaudeSonnet37,   features: useModelFeatures(AiModel.AnthropicClaudeSonnet37) },
      { name: 'Sonnet 3.5 V2',    id: AiModel.AnthropicClaudeSonnet35V2, features: useModelFeatures(AiModel.AnthropicClaudeSonnet35V2) },
      { name: 'Sonnet 3.5',       id: AiModel.AnthropicClaudeSonnet35,   features: useModelFeatures(AiModel.AnthropicClaudeSonnet35) },
      { name: 'Haiku 3.5',        id: AiModel.AnthropicClaudeHaiku35,    features: useModelFeatures(AiModel.AnthropicClaudeHaiku35) },
      { name: 'Opus 3',           id: AiModel.AnthropicClaudeOpus3,      features: useModelFeatures(AiModel.AnthropicClaudeOpus3) },
      { name: 'Haiku 3',          id: AiModel.AnthropicClaudeHaiku3,     features: useModelFeatures(AiModel.AnthropicClaudeHaiku3) },
    ],
  },
  {
    name: 'Gemini',
    icon: Gemini,
    variants: [
      { name: 'Gemini 2.0 Flash',           id: AiModel.GoogleGemini20Flash,     features: useModelFeatures(AiModel.GoogleGemini20Flash) },
      { name: 'Gemini 2.0 Flash Lite',      id: AiModel.GoogleGemini20FlashLite, features: useModelFeatures(AiModel.GoogleGemini20FlashLite) },
      { name: 'Gemini 2.5 Flash',           id: AiModel.GoogleGemini25Flash,     features: useModelFeatures(AiModel.GoogleGemini25Flash) },
      { name: 'Gemini 1.5 Flash',           id: AiModel.GoogleGemini15Flash,     features: useModelFeatures(AiModel.GoogleGemini15Flash) },
      { name: 'Gemini 1.5 Pro',             id: AiModel.GoogleGeminiPro,         features: useModelFeatures(AiModel.GoogleGeminiPro) },
    ],
  },
  // {
  //   name: 'Groq',
  //   icon: Groq,
  //   variants: [
  //     { name: 'Llama 3.1 70B Versatile', id: AiModel.GroqLlama31,  features: useModelFeatures(AiModel.GroqLlama31) },
  //     { name: 'Llama 3.1 8B Instant',    id: AiModel.GroqLlama38b, features: useModelFeatures(AiModel.GroqLlama38b) },
  //     { name: 'Mixtral 8×7B-32768',      id: AiModel.GroqMixtral,  features: useModelFeatures(AiModel.GroqMixtral) },
  //   ],
  // },
  // {
  //   name: 'Mistral',
  //   icon: Mistral,
  //   variants: [
  //     { name: 'Mistral Small 3.1 24B',  id: AiModel.MistralSmall31, features: useModelFeatures(AiModel.MistralSmall31) },
  //     { name: 'Mistral Large 2411',     id: AiModel.MistralLarge,   features: useModelFeatures(AiModel.MistralLarge) },
  //     { name: 'Mistral Nemo',           id: AiModel.MistralNemo,    features: useModelFeatures(AiModel.MistralNemo) },
  //   ],
  // },
  // {
  //   name: 'Cerebras',
  //   icon: Cerebras,
  //   variants: [
  //     { name: 'Llama 3.3 70B', id: AiModel.CerebrasLlama33, features: useModelFeatures(AiModel.CerebrasLlama33) },
  //     { name: 'Llama 3.1 8B',  id: AiModel.CerebrasLlama31, features: useModelFeatures(AiModel.CerebrasLlama31) },
  //   ],
  // },
  // {
  //   name: 'DeepSeek',
  //   icon: DeepSeek,
  //   variants: [
  //     { name: 'DeepSeek Coder', id: AiModel.DeepseekCoder, features: useModelFeatures(AiModel.DeepseekCoder) },
  //     { name: 'DeepSeek Chat',  id: AiModel.DeepseekChat,  features: useModelFeatures(AiModel.DeepseekChat) },
  //   ],
  // },
  // {
  //   name: 'Perplexity',
  //   icon: Perplexity,
  //   variants: [
  //     { name: 'Llama 3.1 Sonar Large (128K)', id: AiModel.PerplexityLlama31Sonar,      features: useModelFeatures(AiModel.PerplexityLlama31Sonar) },
  //     { name: 'Llama 3.1 Sonar Small (128K)', id: AiModel.PerplexityLlama31SonarSmall, features: useModelFeatures(AiModel.PerplexityLlama31SonarSmall) },
  //   ],
  // },
  // {
  //   name: 'Cohere',
  //   icon: Cohere,
  //   variants: [
  //     { name: 'Command-R',      id: AiModel.CohereCommandR,     features: useModelFeatures(AiModel.CohereCommandR) },
  //     { name: 'Command-R Plus', id: AiModel.CohereCommandRPlus, features: useModelFeatures(AiModel.CohereCommandRPlus) },
  //   ],
  // },
  // {
  //   name: 'Ollama',
  //   icon: Ollama,
  //   variants: [
  //     { name: 'Llama 3.1 8B Instruct',   id: AiModel.WorkersAiLlama31,     features: useModelFeatures(AiModel.WorkersAiLlama31) },
  //     { name: 'Llama 3.3 70B Instruct',  id: AiModel.WorkersAiLlama33,     features: useModelFeatures(AiModel.WorkersAiLlama33) },
  //     { name: 'Llama 4 Scout 17B',       id: AiModel.WorkersAiLlama4Scout, features: useModelFeatures(AiModel.WorkersAiLlama4Scout) },
  //   ],
  // },
  // {
  //   name: 'Grok',
  //   icon: Grok,
  //   variants: [
  //     { name: 'Grok Beta', id: AiModel.GrokBeta, features: useModelFeatures(AiModel.GrokBeta) },
  //   ],
  // },
]
