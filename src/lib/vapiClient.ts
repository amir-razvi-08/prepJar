import Vapi from "@vapi-ai/web";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

let vapiInstance: Vapi | null = null;

export function getVapiClient() {
  if (typeof window === "undefined") return null;

  if (!vapiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

    if (!apiKey) {
      console.error(" Missing VAPI API key");
      return null;
    }

    vapiInstance = new Vapi(apiKey);
  }

  return vapiInstance;
}

export const vapiSpeak = async (text:string) => {
  const vapi = getVapiClient();
  if (!vapi) return;

  try {
    await vapi.start({
      conversation: {
        messages: [{ role: "user", content: text }],
      },
    } as CreateAssistantDTO);
  } catch (err) {
    console.error(" Vapi speak failed:", err);
  }
};
