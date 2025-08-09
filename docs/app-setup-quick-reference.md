# Twitter App Setup - Quick Reference

## Required Fields

| Field            | Value                                          | Notes                              |
| ---------------- | ---------------------------------------------- | ---------------------------------- |
| **Callback URI** | `https://localhost:3000/callback`              | Required, can be localhost for dev |
| **Website URL**  | `https://github.com/yourusername/x-mcp-server` | Required, use your repo URL        |

## Optional Fields

| Field                 | Value                                                               | Notes                          |
| --------------------- | ------------------------------------------------------------------- | ------------------------------ |
| **Organization Name** | `X MCP Server`                                                      | Shown during app authorization |
| **Organization URL**  | `https://github.com/yourusername/x-mcp-server`                      | Links to your project          |
| **Terms of Service**  | `https://github.com/yourusername/x-mcp-server/blob/main/LICENSE`    | Optional                       |
| **Privacy Policy**    | `https://github.com/yourusername/x-mcp-server/blob/main/PRIVACY.md` | Optional                       |

## Quick Copy-Paste Values

### For Development

```
Callback URI: https://localhost:3000/callback
Website URL: https://github.com/yourusername/x-mcp-server
Organization Name: X MCP Server
Organization URL: https://github.com/yourusername/x-mcp-server
Terms of Service: https://github.com/yourusername/x-mcp-server/blob/main/LICENSE
Privacy Policy: https://github.com/yourusername/x-mcp-server/blob/main/PRIVACY.md
```

### For Production (replace with your domain)

```
Callback URI: https://yourdomain.com/callback
Website URL: https://yourdomain.com
Organization Name: Your Company Name
Organization URL: https://yourdomain.com
Terms of Service: https://yourdomain.com/terms
Privacy Policy: https://yourdomain.com/privacy
```

## Important Notes

- ✅ **Callback URL**: Can be localhost for development
- ✅ **Website URL**: Must be HTTPS in production
- ✅ **Organization fields**: Optional but recommended
- ✅ **Terms/Privacy**: Optional, can be left blank
- ⚠️ **All URLs**: Must be accessible when Twitter validates them

## Next Steps After Setup

1. Save app settings
2. Go to "Keys and tokens" tab
3. Copy your API credentials
4. Set app permissions (Read + Write)
5. Configure your `.env` file
6. Test with `node scripts/test-auth.js`
