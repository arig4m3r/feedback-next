const { Configuration, OpenAIApi } = require("openai");

let id = 0;

export async function POST(request: Request) {
  const { message } = await request.json();
  if (!message) return new Response("ERRO: Insira a mensagem", { status: 400 });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          'You are a feedback analysis tool, you have to return a valid json response following this format without deviation. The contents replaced in the JSON should be in brazilian portuguese {"rating": "number 0-10", positive: "true or false depending on the feedback", improve: "If necessary improvement, return an detailed explanation into how to improve the product based on the feedback, if not necessary return null", targets: [return the sections of flaw based on the feedback, limited to one word per section]}, changes: [return at max three sectors that need changes to fix custumers issue, limited to one word per sector]',
      },
      { role: "user", content: message },
    ],
  });

  try {
    const res = JSON.parse(completion.data.choices[0].message.content);
    id++;
    return new Response(
      JSON.stringify({
        message,
        id,
        ...res,
      })
    );
  } catch (error) {
    console.error(
      "Error ao fazer parsing do objeto: ",
      completion.data.choices[0].message.content
    );
    return new Response("Erro ao processar mensagem", { status: 500 });
  }
}
