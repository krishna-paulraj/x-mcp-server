# OAuth 2.0 Credentials Guide

## What You Just Received

You've been given your **OAuth 2.0 Client ID and Client Secret** from Twitter. These are important credentials that need to be handled securely.

### Understanding OAuth 2.0 vs API Keys

**OAuth 2.0 Credentials** (what you just received):
- **Client ID**: Public identifier for your app
- **Client Secret**: Private key (keep this secret!)
- **Purpose**: Used for OAuth flows where users authorize your app
- **Use Case**: Web applications, mobile apps, user authorization flows

**API Keys** (what we need for MCP server):
- **API Key**: Public identifier
- **API Secret**: Private key
- **Access Token**: User-specific token
- **Access Token Secret**: User-specific secret
- **Purpose**: Direct API access for server-to-server communication
- **Use Case**: MCP servers, automated tools, backend services

## For Your X MCP Server

**Important**: Your X MCP server uses **API Keys**, not OAuth 2.0 credentials. However, you might need the OAuth credentials for:

1. **Generating Access Tokens**: If you need to create user-specific access tokens
2. **Future OAuth Integration**: If you later want to add OAuth user flows
3. **App Management**: For managing your Twitter app settings

## Secure Storage Instructions

### ✅ DO Store Securely

1. **Environment Variables** (Recommended):
   ```env
   # OAuth 2.0 Credentials (for future use)
   TWITTER_CLIENT_ID=your_client_id_here
   TWITTER_CLIENT_SECRET=your_client_secret_here
   
   # API Keys (for MCP server)
   X_API_KEY=your_api_key_here
   X_API_SECRET=your_api_secret_here
   X_ACCESS_TOKEN=your_access_token_here
   X_ACCESS_TOKEN_SECRET=your_access_token_secret_here
   ```

2. **Password Manager**: Store in a secure password manager
3. **Encrypted File**: Store in an encrypted file on your local machine
4. **Secure Notes**: Use your system's secure notes feature

### ❌ DON'T Store In

- Public repositories
- Shared documents
- Plain text files
- Chat applications
- Email (unencrypted)
- Screenshots in cloud storage

## Next Steps for MCP Server

Since your MCP server uses API keys, you still need to:

1. **Get API Keys**: Go to "Keys and tokens" in your Twitter app dashboard
2. **Generate Access Tokens**: Create access token and secret
3. **Set Permissions**: Ensure your app has Read + Write permissions
4. **Configure Environment**: Add API keys to your `.env` file

## Current Status

| Credential Type | Status | Next Action |
|----------------|--------|-------------|
| **OAuth Client ID** | ✅ Received | Store securely |
| **OAuth Client Secret** | ✅ Received | Store securely |
| **API Key** | ⏳ Pending | Get from "Keys and tokens" |
| **API Secret** | ⏳ Pending | Get from "Keys and tokens" |
| **Access Token** | ⏳ Pending | Generate in "Keys and tokens" |
| **Access Token Secret** | ⏳ Pending | Generate in "Keys and tokens" |

## Security Best Practices

### For OAuth Credentials
- Store Client Secret securely
- Never expose in client-side code
- Rotate regularly
- Monitor for unauthorized use

### For API Keys (MCP Server)
- Use environment variables
- Never commit to version control
- Rotate access tokens regularly
- Monitor API usage

## Troubleshooting

### If OAuth Credentials Are Compromised
1. **Immediate Action**: Regenerate Client Secret in Twitter Developer Portal
2. **Update Environment**: Update your `.env` file with new credentials
3. **Audit Usage**: Check for any unauthorized API calls
4. **Monitor**: Watch for suspicious activity

### If You Need OAuth for MCP Server
Currently, your MCP server is designed to use API keys. If you need OAuth integration:

1. **Modify Server**: Update the authentication flow in `src/index.ts`
2. **Add OAuth Flow**: Implement user authorization process
3. **Store Tokens**: Securely store user access tokens
4. **Handle Refresh**: Implement token refresh logic

## Quick Reference

### Store These Securely
```
OAuth Client ID: [your_client_id]
OAuth Client Secret: [your_client_secret]
```

### Still Need These for MCP Server
```
API Key: [get from Keys and tokens]
API Secret: [get from Keys and tokens]
Access Token: [generate in Keys and tokens]
Access Token Secret: [generate in Keys and tokens]
```

## Next Action

1. **Save OAuth credentials** securely
2. **Navigate to "Keys and tokens"** in your Twitter app dashboard
3. **Get your API credentials** for the MCP server
4. **Configure your `.env` file** with API credentials
5. **Test the MCP server** with `npm run test-auth`

---

**Remember**: Your OAuth credentials are for future OAuth flows, but your MCP server currently needs the API keys from the "Keys and tokens" section to function.
