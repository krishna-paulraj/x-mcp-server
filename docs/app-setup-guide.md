# Twitter App Setup Guide

This guide provides the recommended values for setting up your Twitter app information when creating your X MCP server application.

## Required Fields

### Callback URI / Redirect URL

**Required**: `https://` or `scheme://`

**Recommended Value**:

```
https://localhost:3000/callback
```

**Alternative Options**:

- `https://yourdomain.com/callback` (if you have a domain)
- `x-mcp-server://callback` (custom scheme)
- `http://localhost:3000/callback` (for development)

**Note**: For MCP server usage, you typically won't need OAuth callbacks, but Twitter requires this field. The localhost URL is fine for development purposes.

### Website URL

**Required**: `https://`

**Recommended Value**:

```
https://github.com/yourusername/x-mcp-server
```

**Alternative Options**:

- `https://yourdomain.com` (if you have a domain)
- `https://github.com/yourusername/x-mcp-server` (GitHub repository)
- `https://your-organization.com` (if you have an organization website)

## Optional Fields

### Organization Name

**Optional**: This name will be shown when users authorize your App

**Recommended Value**:

```
X MCP Server
```

**Alternative Options**:

- `Your Name`
- `Your Company Name`
- `MCP Tools`
- `Social Media Tools`

### Organization URL

**Optional**: This link will be shown when users authorize your App

**Recommended Value**:

```
https://github.com/yourusername/x-mcp-server
```

**Alternative Options**:

- `https://yourdomain.com`
- `https://your-organization.com`
- `https://github.com/yourusername` (your GitHub profile)

### Terms of Service

**Optional**: A link to your terms of service

**Recommended Value**:

```
https://github.com/yourusername/x-mcp-server/blob/main/LICENSE
```

**Alternative Options**:

- `https://yourdomain.com/terms`
- `https://your-organization.com/terms`
- Leave blank if you don't have terms of service

### Privacy Policy

**Optional**: A link to your privacy policy

**Recommended Value**:

```
https://github.com/yourusername/x-mcp-server/blob/main/PRIVACY.md
```

**Alternative Options**:

- `https://yourdomain.com/privacy`
- `https://your-organization.com/privacy`
- Leave blank if you don't have a privacy policy

## Complete Example

Here's a complete example of how to fill out the app information:

```
App Name: x-mcp-server
Description: MCP server for posting tweets to X (Twitter)

Callback URI / Redirect URL: https://localhost:3000/callback
Website URL: https://github.com/yourusername/x-mcp-server

Organization Name: X MCP Server
Organization URL: https://github.com/yourusername/x-mcp-server
Terms of Service: https://github.com/yourusername/x-mcp-server/blob/main/LICENSE
Privacy Policy: https://github.com/yourusername/x-mcp-server/blob/main/PRIVACY.md
```

## Important Notes

### For Development

- Use `localhost` URLs for callback and website if you don't have a public domain
- These URLs are primarily for OAuth flows, which you may not need for MCP server usage
- Twitter will still require these fields even if you don't use OAuth

### For Production

- Use your actual domain names
- Ensure all URLs are accessible
- Consider creating proper terms of service and privacy policy pages

### Security Considerations

- The callback URL should be secure (HTTPS) in production
- Don't use placeholder URLs in production
- Ensure your organization information is accurate

## Next Steps

After setting up your app information:

1. **Save the app settings**
2. **Navigate to "Keys and tokens"** to get your API credentials
3. **Set app permissions** (Read, Write, Direct message)
4. **Configure your environment variables** using the credentials
5. **Test the authentication** using the provided test script

## Troubleshooting

### Common Issues

**Error**: "Invalid callback URL"

- **Solution**: Ensure the URL starts with `https://` or `http://`
- **Solution**: Use a valid domain or localhost for development

**Error**: "Website URL is required"

- **Solution**: Provide a valid HTTPS URL
- **Solution**: Use your GitHub repository URL if you don't have a website

**Error**: "Organization name is invalid"

- **Solution**: Use only alphanumeric characters and spaces
- **Solution**: Keep it under 50 characters

### Getting Help

If you encounter issues with app setup:

1. **Check URL formats**: Ensure all URLs are properly formatted
2. **Verify domain accessibility**: Make sure URLs are accessible
3. **Review Twitter's guidelines**: Check the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) for current requirements
4. **Contact support**: Use Twitter's developer support if needed

---

**Remember**: These app information settings are primarily for OAuth flows and user authorization. For MCP server usage with API keys, the most important part is getting your API credentials from the "Keys and tokens" section.
