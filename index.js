// By VishwaGauravIn (https://itsvg.in)

const { GoogleGenAI } = require("@google/genai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GoogleGenAI({apiKey: SECRETS.GEMINI_API_KEY});

async function run() {
  // Write your prompt here
  const prompt =
    "generate a twitt talking about insight quant ai, an ai to trade on crypto currencies. mention @insightquantai and add this link https://mobile.isq.ai/#/pages/login/register?invite=9839783";

  // For text-only input
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    maxOutputTokens: 400,
  });
  const text = response.text;
  console.log('GEMINI RESULT: ' + text);
  //sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
