#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export class XMCPServer {
  private server: Server;
  private twitterClient: TwitterApi | null = null;

  constructor() {
    this.server = new Server(
      {
        name: "x-mcp-server",
        version: "1.0.0",
      }
    );

    this.setupToolHandlers();
  }

  private getTools() {
    return [
      {
        name: "post_tweet",
        description: "Post a tweet to X (Twitter)",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text content of the tweet (max 280 characters)",
            },
            reply_to_tweet_id: {
              type: "string",
              description: "Optional: ID of the tweet to reply to",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "get_user_timeline",
        description: "Get the user's recent tweets",
        inputSchema: {
          type: "object",
          properties: {
            count: {
              type: "number",
              description: "Number of tweets to retrieve (max 100)",
              default: 10,
            },
          },
        },
      },
      {
        name: "search_tweets",
        description: "Search for tweets using a query",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query for tweets",
            },
            count: {
              type: "number",
              description: "Number of tweets to retrieve (max 100)",
              default: 10,
            },
          },
          required: ["query"],
        },
      },
    ];
  }

  public async listTools() {
    return {
      tools: this.getTools(),
    };
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Initialize Twitter client if not already done
        if (!this.twitterClient) {
          await this.initializeTwitterClient();
        }

        switch (name) {
          case "post_tweet":
            return await this.postTweet(args);
          case "get_user_timeline":
            return await this.getUserTimeline(args);
          case "search_tweets":
            return await this.searchTweets(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async initializeTwitterClient() {
    const apiKey = process.env.X_API_KEY;
    const apiSecret = process.env.X_API_SECRET;
    const accessToken = process.env.X_ACCESS_TOKEN;
    const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
      throw new Error(
        "Missing X API credentials. Please set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, and X_ACCESS_TOKEN_SECRET environment variables."
      );
    }

    this.twitterClient = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessTokenSecret,
    });
  }

  private async postTweet(args: any) {
    if (!this.twitterClient) {
      throw new Error("Twitter client not initialized");
    }

    const { text, reply_to_tweet_id } = args;

    if (!text || typeof text !== "string") {
      throw new Error("Text is required and must be a string");
    }

    if (text.length > 280) {
      throw new Error("Tweet text cannot exceed 280 characters");
    }

    try {
      const tweetOptions: any = { text };

      if (reply_to_tweet_id) {
        tweetOptions.reply = { in_reply_to_tweet_id: reply_to_tweet_id };
      }

      const tweet = await this.twitterClient.v2.tweet(tweetOptions);

      return {
        content: [
          {
            type: "text",
            text: `Tweet posted successfully! Tweet ID: ${tweet.data.id}`,
          },
        ],
      };
    } catch (error) {
      // Provide more detailed error information
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to post tweet: ${errorMessage}`);
    }
  }

  private async getUserTimeline(args: any) {
    if (!this.twitterClient) {
      throw new Error("Twitter client not initialized");
    }

    const count = Math.min(args.count || 10, 100);

    try {
      const me = await this.twitterClient.v2.me();
      const tweets = await this.twitterClient.v2.userTimeline(me.data.id, {
        max_results: count,
        "tweet.fields": ["created_at", "public_metrics"],
        expansions: ["author_id"],
      });

      const tweetList = tweets.data.data || [];
      const formattedTweets = tweetList
        .map((tweet) => `- ${tweet.text} (${tweet.id})`)
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Your recent tweets:\n${formattedTweets}`,
          },
        ],
      };
    } catch (error) {
      // If timeline fails, just return user info
      const me = await this.twitterClient.v2.me();
      return {
        content: [
          {
            type: "text",
            text: `User: @${me.data.username} (${me.data.name})\nTimeline access may be restricted.`,
          },
        ],
      };
    }
  }

  private async searchTweets(args: any) {
    if (!this.twitterClient) {
      throw new Error("Twitter client not initialized");
    }

    const { query, count = 10 } = args;

    if (!query || typeof query !== "string") {
      throw new Error("Query is required and must be a string");
    }

    const searchCount = Math.min(count, 100);

    const tweets = await this.twitterClient.v2.search(query, {
      max_results: searchCount,
      "tweet.fields": ["created_at", "author_id"],
    });

    const tweetList = tweets.data.data || [];
    const formattedTweets = tweetList
      .map((tweet) => `- ${tweet.text} (by @${tweet.author_id})`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `Search results for "${query}":\n${formattedTweets}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("X MCP Server started");
  }
}

// Start the server
const server = new XMCPServer();
server.run().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
