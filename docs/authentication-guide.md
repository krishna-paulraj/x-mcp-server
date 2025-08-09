# X MCP Server Authentication Guide

This guide will walk you through setting up authentication for the X MCP server to post tweets and interact with the X API.

## Prerequisites

- A Twitter/X account
- Internet connection
- Basic understanding of API authentication

## Step 1: Create a Twitter Developer Account

1. **Visit the Twitter Developer Portal**
   - Go to [https://developer.twitter.com/en/apply](https://developer.twitter.com/en/apply)
   - Click "Apply for a developer account"

2. **Complete the Application**
   - Fill out the required information
   - Explain your use case (e.g., "Building an MCP server for posting tweets")
   - Submit the application
   - Wait for approval (usually 24-48 hours)

## Step 2: Create a Twitter App

1. **Access the Developer Dashboard**
   - Go to [https://developer.twitter.com/en/portal/dashboard](https://developer.twitter.com/en/portal/dashboard)
   - Sign in with your Twitter account

2. **Create a New App**
   - Click "Create App" or "Create Project"
   - Fill in the required information:
     - **App name**: `x-mcp-server` (or your preferred name)
     - **Description**: `MCP server for posting tweets`
     - **Website URL**: `https://github.com/yourusername/x-mcp-server` (optional)
     - **Callback URL**: Leave blank for this use case

## Step 3: Get Your API Credentials

1. **Navigate to Keys and Tokens**
   - In your app dashboard, click on "Keys and tokens" tab
   - You'll see several credential types

2. **Copy the Required Credentials**
   - **API Key** (also called Consumer Key)
   - **API Secret** (also called Consumer Secret)
   - **Access Token** (generate if not present)
   - **Access Token Secret** (generate if not present)
   - **Bearer Token** (optional, for read-only operations)

3. **Generate Access Tokens** (if needed)
   - Click "Generate" next to "Access Token and Secret"
   - Copy both the token and secret

## Step 4: Configure App Permissions

1. **Set App Permissions**
   - Go to "App permissions" tab
   - Select the appropriate permissions:
     - **Read**: For timeline and search operations
     - **Write**: For posting tweets
     - **Direct message**: For DM operations (optional)

2. **Save Changes**
   - Click "Save" to apply the permissions

## Step 5: Set Up Environment Variables

1. **Create Environment File**
   ```bash
   cp env.example .env
   ```

2. **Add Your Credentials**
   Edit the `.env` file and replace the placeholder values:
   ```env
   X_API_KEY=your_actual_api_key_here
   X_API_SECRET=your_actual_api_secret_here
   X_ACCESS_TOKEN=your_actual_access_token_here
   X_ACCESS_TOKEN_SECRET=your_actual_access_token_secret_here
   X_BEARER_TOKEN=your_actual_bearer_token_here
   ```

## Step 6: Test Authentication

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Test the Server**
   ```bash
   npm start
   ```

3. **Verify Connection**
   - The server should start without authentication errors
   - Check the console for any error messages

## Security Best Practices

### ✅ Do's
- Store credentials in environment variables
- Use `.env` file (already in `.gitignore`)
- Rotate credentials regularly
- Monitor API usage
- Use least privilege principle

### ❌ Don'ts
- Never commit `.env` to version control
- Don't hardcode credentials in source code
- Don't share credentials publicly
- Don't use the same credentials across multiple projects

## Troubleshooting Common Issues

### Authentication Errors

**Error**: `Missing X API credentials`
- **Solution**: Ensure all required environment variables are set in `.env`

**Error**: `Invalid or expired token`
- **Solution**: Regenerate your access tokens in the Twitter Developer Portal

**Error**: `Rate limit exceeded`
- **Solution**: Wait for rate limit to reset or upgrade your API tier

### Permission Errors

**Error**: `App not authorized to access this endpoint`
- **Solution**: Check your app permissions in the Twitter Developer Portal

**Error**: `Read-only application`
- **Solution**: Enable "Write" permissions for your app

### Network Errors

**Error**: `Connection timeout`
- **Solution**: Check your internet connection and firewall settings

## API Rate Limits

Be aware of Twitter's API rate limits:

- **Tweets**: 300 per 3-hour window
- **User timeline**: 900 requests per 15-minute window
- **Search**: 450 requests per 15-minute window

## Monitoring Usage

1. **Check API Usage**
   - Visit your app dashboard
   - Monitor usage in the "Analytics" section

2. **Set Up Alerts**
   - Configure notifications for rate limit warnings
   - Monitor for unusual activity

## Getting Help

If you encounter issues:

1. **Check the Error Messages**: The server provides detailed error information
2. **Verify Credentials**: Double-check all API keys and tokens
3. **Review Permissions**: Ensure your app has the correct permissions
4. **Check Rate Limits**: Verify you haven't exceeded API limits
5. **Consult Documentation**: Review the [Twitter API documentation](https://developer.twitter.com/en/docs)

## Next Steps

Once authentication is set up:

1. **Test Basic Operations**:
   - Try posting a simple tweet
   - Retrieve your timeline
   - Search for tweets

2. **Integrate with MCP Client**:
   - Configure your MCP client to use this server
   - Test the integration

3. **Monitor and Maintain**:
   - Regularly check API usage
   - Rotate credentials as needed
   - Keep the server updated

---

**Note**: This authentication setup is required for the X MCP server to function. Without proper credentials, the server will not be able to post tweets or interact with the X API.
