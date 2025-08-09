# Troubleshooting 401 Authentication Error

## 🚨 Error: "Request failed with code 401"

This error occurs when the X MCP server cannot authenticate with the Twitter API. Here's how to fix it:

## 🔍 Quick Diagnosis

### 1. Check Your Environment Variables

```bash
npm run test-auth
```

**Expected Output:**

```
✅ X_API_KEY: Set
✅ X_API_SECRET: Set
✅ X_ACCESS_TOKEN: Set
✅ X_ACCESS_TOKEN_SECRET: Set
✅ Authentication successful!
```

**If you see ❌ instead of ✅**, your credentials are missing or incorrect.

### 2. Verify Your `.env` File

Make sure your `.env` file contains:

```env
X_API_KEY=your_actual_api_key_here
X_API_SECRET=your_actual_api_secret_here
X_ACCESS_TOKEN=your_actual_access_token_here
X_ACCESS_TOKEN_SECRET=your_actual_access_token_secret_here
```

## 🔧 Step-by-Step Fix

### Step 1: Get Your API Credentials

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Select your app
3. Go to "Keys and tokens" tab
4. Copy these values:
   - **API Key** (Consumer Key)
   - **API Secret** (Consumer Secret)
   - **Access Token** (generate if not present)
   - **Access Token Secret** (generate if not present)

### Step 2: Update Your Environment

```bash
# Copy the template
cp env.example .env

# Edit the file with your actual credentials
nano .env  # or use your preferred editor
```

### Step 3: Test Authentication

```bash
npm run test-auth
```

### Step 4: Check App Permissions

In your Twitter app dashboard:

1. Go to "App permissions"
2. Ensure you have **Read + Write** permissions
3. Save changes

## 🚨 Common Issues & Solutions

### Issue 1: "Missing X API credentials"

**Solution:**

- Check that your `.env` file exists
- Verify all required variables are set
- Ensure no typos in variable names

### Issue 2: "Invalid or expired token"

**Solution:**

- Regenerate your access tokens in Twitter Developer Portal
- Update your `.env` file with new tokens
- Test again with `npm run test-auth`

### Issue 3: "App not authorized to access this endpoint"

**Solution:**

- Check your app permissions (Read + Write)
- Ensure your developer account is approved
- Wait 24-48 hours after app creation

### Issue 4: "Rate limit exceeded"

**Solution:**

- Wait for rate limit to reset
- Check your API usage in the developer portal
- Consider upgrading your API tier

## 🔍 Debugging Steps

### 1. Test API Connection

```bash
node scripts/test-post-tweet.js
```

### 2. Check MCP Server

```bash
npm run build
npm start
```

### 3. Verify Credentials Format

Your credentials should look like:

- **API Key**: `1234567890abcdefghijk`
- **API Secret**: `abcdefghijklmnopqrstuvwxyz1234567890`
- **Access Token**: `1234567890-abcdefghijklmnopqrstuvwxyz1234567890`
- **Access Token Secret**: `abcdefghijklmnopqrstuvwxyz1234567890`

## ✅ Success Indicators

When everything is working correctly, you should see:

```
✅ X_API_KEY: Set
✅ X_API_SECRET: Set
✅ X_ACCESS_TOKEN: Set
✅ X_ACCESS_TOKEN_SECRET: Set
✅ Authentication successful!
👤 User: @yourusername (Your Name)
🎉 MCP Server is ready to post tweets!
```

## 🆘 Still Having Issues?

### 1. Check Twitter Developer Portal

- Verify your app is active
- Check for any error messages
- Ensure your account is in good standing

### 2. Test with Different Credentials

- Create a new app in Twitter Developer Portal
- Generate new credentials
- Test with the new credentials

### 3. Check Network/Firewall

- Ensure your system can reach Twitter's API
- Check if corporate firewall is blocking requests
- Try from a different network

### 4. Contact Support

- Check [Twitter Developer Support](https://developer.twitter.com/en/support)
- Review [API Documentation](https://developer.twitter.com/en/docs)
- Look for known issues in the [Developer Forum](https://twittercommunity.com/)

## 🎯 Quick Fix Checklist

- [ ] `.env` file exists and has correct credentials
- [ ] All 4 required environment variables are set
- [ ] App has Read + Write permissions
- [ ] Developer account is approved
- [ ] No rate limit issues
- [ ] Network can reach Twitter API
- [ ] Credentials are not expired

## 📞 Need Help?

If you're still experiencing issues:

1. **Run the test script**: `npm run test-auth`
2. **Check the output** for specific error messages
3. **Review this guide** for the specific error
4. **Check Twitter's status** at [status.twitter.com](https://status.twitter.com)
5. **Contact support** if the issue persists

---

**Remember**: The 401 error means authentication failed. Once you fix the credentials and permissions, your MCP server should work perfectly!

