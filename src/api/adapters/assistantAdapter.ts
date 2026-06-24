export type AssistantResponse = {
  answer: string;
  confidence: number;
  citations: string[];
};

export async function getAssistantResponse(
  question: string
): Promise<AssistantResponse> {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return {
    answer: `Based on GOV-204 guidance, the request "${question}" requires identity verification and supporting documentation before processing.`,
    confidence: 92,
    citations: [
      'Benefits Manual 2025',
      'Disability Services Circular',
      'Citizen Support Policy',
    ],
  };
}