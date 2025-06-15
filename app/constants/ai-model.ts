export enum AiModel {
  OpenaiGpt4o = 'gpt-4o',
  OpenaiGpt4oMini = 'gpt-4o-mini',
  OpenaiGpt4Turbo = 'gpt-4-turbo',
  OpenaiGpt4 = 'gpt-4',
  OpenaiGpt35Turbo = 'gpt-3.5-turbo',

  AnthropicClaudeOpus4 = 'claude-opus-4-20250514',
  AnthropicClaudeSonnet4 = 'claude-sonnet-4-20250514',
  AnthropicClaudeSonnet37 = 'claude-3-7-sonnet-20250219',
  AnthropicClaudeSonnet35V2 = 'claude-3-5-sonnet-20241022',
  AnthropicClaudeSonnet35 = 'claude-3-5-sonnet-20240620',
  AnthropicClaudeHaiku35 = 'claude-3-5-haiku-20241022',
  AnthropicClaudeOpus3 = 'claude-3-opus-20240229',
  AnthropicClaudeHaiku3 = 'claude-3-haiku-20240307',

  GoogleGemini20Flash = 'gemini-2.0-flash',
  GoogleGemini20FlashLite = 'gemini-2.0-flash-lite',
  GoogleGemini25Flash = 'gemini-2.5-flash-preview-05-20',
  GoogleGemini15Flash = 'gemini-1.5-flash',
  GoogleGeminiPro = 'gemini-1.5-pro',

  GroqLlama31 = 'llama-3.1-70b-versatile',
  GroqLlama38b = 'llama-3.1-8b-instant',
  GroqMixtral = 'mixtral-8x7b-32768',

  MistralSmall31 = 'mistral-small-3.1-24b-instruct',
  MistralLarge = 'mistral-large-2411',
  MistralNemo = 'mistral-nemo',

  CerebrasLlama33 = 'llama-3.3-70b',
  CerebrasLlama31 = 'llama-3.1-8b',

  DeepseekCoder = 'deepseek-coder',
  DeepseekChat = 'deepseek-chat',

  PerplexityLlama31Sonar = 'llama-3.1-sonar-large-128k-online',
  PerplexityLlama31SonarSmall = 'llama-3.1-sonar-small-128k-online',

  CohereCommandR = 'command-r',
  CohereCommandRPlus = 'command-r-plus',

  WorkersAiLlama31 = '@cf/meta/llama-3.1-8b-instruct',
  WorkersAiLlama33 = '@cf/meta/llama-3.3-70b-instruct',
  WorkersAiLlama4Scout = '@cf/meta/llama-4-scout-17b-16e-instruct',

  GrokBeta = 'grok-beta',
}
