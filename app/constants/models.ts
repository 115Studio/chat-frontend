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

export enum Features {
  Reasoning = 'reasoning',
  PdfScan   = 'pdf-scan',
  Vision    = 'vision',
  Internet  = 'internet',
  ImageGen  = 'image-gen',
}

export const models = [
  {
    name: 'OpenAI',
    icon: OpenAi,
    variants: [
      { name: 'GPT-4o',         features: [Features.Vision, Features.Reasoning] },
      { name: 'GPT-4o Mini',    features: [Features.Vision, Features.Reasoning] },
      { name: 'GPT-4 Turbo',    features: [Features.Reasoning] },
      { name: 'GPT-4',          features: [Features.Reasoning] },
      { name: 'GPT-3.5 Turbo',  features: [] },
    ],
  },
  {
    name: 'Claude',
    icon: Claude,
    variants: [
      { name: 'Opus 4',           features: [Features.Reasoning] },
      { name: 'Sonnet 4',         features: [Features.Vision, Features.PdfScan, Features.Reasoning] },
      { name: 'Sonnet 3.7',       features: [Features.Vision, Features.PdfScan, Features.Reasoning] },
      { name: 'Sonnet 3.5 V2',    features: [Features.Vision, Features.PdfScan] },
      { name: 'Sonnet 3.5',       features: [Features.Vision, Features.PdfScan] },
      { name: 'Haiku 3.5',        features: [] },
      { name: 'Opus 3',           features: [Features.Reasoning] },
      { name: 'Haiku 3',          features: [] },
    ],
  },
  {
    name: 'Gemini',
    icon: Gemini,
    variants: [
      { name: 'Gemini 2.0 Flash',           features: [Features.Internet, Features.PdfScan, Features.Vision] },
      { name: 'Gemini 2.0 Flash Lite',      features: [Features.PdfScan, Features.Vision] },
      { name: 'Gemini 2.5 Flash (preview)', features: [Features.Internet, Features.PdfScan, Features.Vision] },
      { name: 'Gemini 1.5 Flash',           features: [Features.Vision] },
      { name: 'Gemini 1.5 Pro',             features: [Features.Internet, Features.PdfScan, Features.Vision, Features.Reasoning] },
    ],
  },
  {
    name: 'Groq',
    icon: Groq,
    variants: [
      { name: 'Llama 3.1 70B Versatile', features: [Features.Reasoning] },
      { name: 'Llama 3.1 8B Instant',    features: [Features.Reasoning] },
      { name: 'Mixtral 8×7B-32768',      features: [Features.Reasoning] },
    ],
  },
  {
    name: 'Mistral',
    icon: Mistral,
    variants: [
      { name: 'Mistral Small 3.1 24B', features: [Features.Reasoning] },
      { name: 'Mistral Large 2411',     features: [Features.Reasoning] },
      { name: 'Mistral Nemo',           features: [Features.Reasoning] },
    ],
  },
  {
    name: 'Cerebras',
    icon: Cerebras,
    variants: [
      { name: 'Llama 3.3 70B', features: [Features.Reasoning] },
      { name: 'Llama 3.1 8B',  features: [Features.Reasoning] },
    ],
  },
  {
    name: 'DeepSeek',
    icon: DeepSeek,
    variants: [
      { name: 'DeepSeek Coder', features: [Features.Reasoning] },
      { name: 'DeepSeek Chat',  features: [Features.Reasoning] },
    ],
  },
  {
    name: 'Perplexity',
    icon: Perplexity,
    variants: [
      { name: 'Llama 3.1 Sonar Large (128K)', features: [Features.Internet, Features.Reasoning] },
      { name: 'Llama 3.1 Sonar Small (128K)', features: [Features.Internet, Features.Reasoning] },
    ],
  },
  {
    name: 'Cohere',
    icon: Cohere,
    variants: [
      { name: 'Command-R',      features: [Features.Internet, Features.Reasoning] },
      { name: 'Command-R Plus', features: [Features.Internet, Features.Reasoning] },
    ],
  },
  {
    name: 'Ollama',
    icon: Ollama,
    variants: [
      { name: 'Llama 3.1 8B Instruct',   features: [Features.Reasoning] },
      { name: 'Llama 3.3 70B Instruct',  features: [Features.Reasoning] },
      { name: 'Llama 4 Scout 17B',      features: [Features.Reasoning] },
    ],
  },
  {
    name: 'Grok',
    icon: Grok,
    variants: [
      { name: 'Grok Beta', features: [Features.Reasoning] },
    ],
  },
]
