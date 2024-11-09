import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OpenAIModelID {
  // OpenChat
  OPENCHAT = 'OpenChat',
  OPENCHAT_8192 = 'OpenChat-8192',

  OPENCHAT3_1 = 'openchat_v3.1_llama2',
  OPENCHAT3_2 = 'openchat_v3.2',

  OPENCODER = 'OpenCoder',

  OPENCHAT_3_5 = 'gpt-3.5-turbo',
  OPENCHAT_4_S = 'ft:gpt-4o-mini-2024-07-18:personal:vnbchatbot:AQaCOK4t'
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.OPENCHAT3_2;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  // OpenChat
  [OpenAIModelID.OPENCHAT]: {
    id: OpenAIModelID.OPENCHAT,
    name: 'OpenChat',
    maxLength: 2048 * 3,
    tokenLimit: 2048,
  },
  [OpenAIModelID.OPENCHAT_8192]: {
    id: OpenAIModelID.OPENCHAT_8192,
    name: 'OpenChat-8192',
    maxLength: 8192 * 3,
    tokenLimit: 8192,
  },
  [OpenAIModelID.OPENCODER]: {
    id: OpenAIModelID.OPENCODER,
    name: 'OpenCoder',
    maxLength: 8192 * 3,
    tokenLimit: 8192,
  },

  [OpenAIModelID.OPENCHAT3_1]: {
    id: OpenAIModelID.OPENCHAT3_1,
    name: 'OpenChat 3.1',
    maxLength: 4096 * 3,
    tokenLimit: 4096,
  },

  [OpenAIModelID.OPENCHAT3_2]: {
    id: OpenAIModelID.OPENCHAT3_2,
    name: 'OpenChat 3.2',
    maxLength: 4096 * 3,
    tokenLimit: 4096,
  },

  [OpenAIModelID.OPENCHAT_3_5]: {
    id: OpenAIModelID.OPENCHAT_3_5,
    name: 'VNB 3.5 (latest)',
    maxLength: 8192 * 3,
    tokenLimit: 8192,
  },

  [OpenAIModelID.OPENCHAT_4_S]: {
    id: OpenAIModelID.OPENCHAT_4_S,
    name: 'VNB 4.0 (latest)',
    maxLength: 8192 * 3,
    tokenLimit: 8192,
  }
};
