import {
  OpenAIClient,
  AzureKeyCredential,
  ChatResponseMessage,
} from "@azure/openai";

async function AIAzureSuggestion({ term }: { term: string }) {
  const fetchChatCompletion = async () => {
    const completions: (ChatResponseMessage | undefined)[] = [];

    const endpoint = process.env.ENDPOINT;
    const azureApiKey = process.env.AZURE_API_KEY;

    if (!endpoint) throw new Error("Missing endpoint");
    if (!azureApiKey) throw new Error("Missing Azure API Key");

    console.log(
      `Using endpoint: ${endpoint} and Azure API Key: ${azureApiKey}`
    );

    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    const deploymentId = "disney-clone-youtube-35";

    const result = await client.getChatCompletions(
      deploymentId,
      [
        {
          role: "system",
          content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
        },
        {
          role: "user",
          content: `I like: ${term}`,
        },
      ],
      { maxTokens: 128 }
    );

    for (const choice of result.choices) {
      console.log(choice.message);
      completions.push(choice.message);
    }

    return completions[0];
  };

  // Call the fetch function
  const completion = await fetchChatCompletion();

  return (
    <div className="flex space-x-5 mt-32 xl:mt-42 p-10 pb-0">
      <div className="animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white" />

      <div>
        <p className="text-sm text-purple-400">
          Azure Open AI Assistant Suggests:{" "}
        </p>
        <p className="italic text-xl">{completion?.content}</p>
      </div>
    </div>
  );
}

export default AIAzureSuggestion;
