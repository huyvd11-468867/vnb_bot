import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

import llamaTokenizer from 'llama-tokenizer-js';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, messages, key, prompt, temperature } = (await req.json()) as ChatBody;
    console.log(1)
    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }
    console.log(2)
    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }
    console.log(3)
    const prompt_tokens = llamaTokenizer.encode(promptToSend, false);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];
    console.log(4)
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = llamaTokenizer.encode(message.content, false);

      if (tokenCount + tokens.length + 768 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }
    console.log(5)
    const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key, messagesToSend);
    console.log(6)
    console.log("=======================")
    return new Response(stream);
  } catch (error) {
    console.error(error);
    console.log("Lỗi")
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
