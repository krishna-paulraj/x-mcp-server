# X MCP Server

A Model Context Protocol (MCP) server for posting tweets to X (Twitter) and interacting with the X API.

## Features

- **Post Tweets**: Create and post tweets to X (Twitter)
- **Get User Timeline**: Retrieve your recent tweets
- **Search Tweets**: Search for tweets using queries
- **Reply to Tweets**: Reply to existing tweets
- **Error Handling**: Comprehensive error handling and validation

## Prerequisites

1. **X Developer Account**: You need a Twitter/X developer account
   - Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Create a new app and get your API credentials

2. **Node.js**: Version 18 or higher

## Setup

1. **Clone and Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your X API credentials:
   ```env
   X_API_KEY=your_api_key_here
   X_API_SECRET=your_api_secret_here
   X_ACCESS_TOKEN=your_access_token_here
   X_ACCESS_TOKEN_SECRET=your_access_token_secret_here
   ```

3. **Build the Project**:
   ```bash
   npm run build
   ```

## Usage

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Available Tools

The server provides the following tools:

#### 1. `post_tweet`
Post a new tweet to X.

**Parameters:**
- `text` (required): The tweet content (max 280 characters)
- `reply_to_tweet_id` (optional): ID of the tweet to reply to

**Example:**
```json
{
  "text": "Hello, world! This is my first tweet via MCP! 🚀",
  "reply_to_tweet_id": "1234567890123456789"
}
```

#### 2. `get_user_timeline`
Get your recent tweets.

**Parameters:**
- `count` (optional): Number of tweets to retrieve (default: 10, max: 100)

**Example:**
```json
{
  "count": 5
}
```

#### 3. `search_tweets`
Search for tweets using a query.

**Parameters:**
- `query` (required): Search query
- `count` (optional): Number of results (default: 10, max: 100)

**Example:**
```json
{
  "query": "MCP protocol",
  "count": 20
}
```

## MCP Client Configuration

To use this server with an MCP client, add it to your client configuration:

```json
{
  "mcpServers": {
    "x-server": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "X_API_KEY": "your_api_key",
        "X_API_SECRET": "your_api_secret",
        "X_ACCESS_TOKEN": "your_access_token",
        "X_ACCESS_TOKEN_SECRET": "your_access_token_secret"
      }
    }
  }
}
```

## Development

### Project Structure

```
x-mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── env.example           # Environment variables template
└── README.md            # This file
```

### Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled server
- `npm run dev`: Run in development mode with hot reload
- `npm test`: Run tests (when implemented)

## Error Handling

The server includes comprehensive error handling for:

- Missing API credentials
- Invalid tweet content (length, format)
- API rate limits
- Network errors
- Invalid parameters

## Security Notes

- Never commit your `.env` file to version control
- Keep your API credentials secure
- Use environment variables for all sensitive data
- Consider using a `.gitignore` file to exclude sensitive files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the error messages for common issues
2. Verify your API credentials are correct
3. Ensure you have the necessary X API permissions
4. Check the X API documentation for rate limits and restrictions
# x-mcp-server
