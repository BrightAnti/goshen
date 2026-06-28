# Supabase Keepalive Setup Guide

This guide explains how to keep your Supabase instance active using a cron job.

## ✅ What's Already Done

- ✅ Keepalive API route created at `/app/api/keepalive/route.ts`
- ✅ Endpoint tested and working locally

## 🧪 Local Testing

The keepalive endpoint is ready to test:

### Test Without Token (if `KEEPALIVE_SECRET_TOKEN` is not set)

```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/keepalive" -Method GET

# Or open in browser:
http://localhost:3000/api/keepalive
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Supabase is active",
  "timestamp": "2025-12-13T15:57:16.131Z",
  "count": 0
}
```

### Test With Token (if `KEEPALIVE_SECRET_TOKEN` is set)

```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/keepalive?token=your-secret-token" -Method GET
```

## 🚀 Production Setup

### Step 1: Add Environment Variable (Optional but Recommended)

Add to your hosting platform's environment variables:

```env
KEEPALIVE_SECRET_TOKEN=your-random-secret-token-here
```

**Generate a secure token:**

- Use: https://www.random.org/strings/ (32 characters, alphanumeric)
- Or: `openssl rand -hex 32` (if you have OpenSSL)

### Step 2: Deploy Your App

Make sure your app is deployed and the API route is accessible at:

```
https://yourdomain.com/api/keepalive
```

### Step 3: Set Up cron-job.org

1. **Sign up** at https://cron-job.org (free account)

2. **Create a new cron job:**

   - **Title**: `Supabase Keepalive`
   - **Address (URL)**: `https://yourdomain.com/api/keepalive?token=your-secret-token`
   - **Schedule**: Custom
   - **Cron expression**: `0 2 */3 * *` (every 3 days at 2:00 AM UTC)
   - **Request method**: `GET`
   - **Save** the job

3. **Test immediately:**
   - Click "Execute now" button in cron-job.org
   - Check the execution log to verify it worked

### Step 4: Verify It's Working

1. Check cron-job.org dashboard for successful executions
2. Check your Supabase dashboard - it should stay active
3. Monitor the logs in cron-job.org to see execution history

## 📋 Cron Schedule Options

The current schedule is **every 3 days** (`0 2 */3 * *`). Here are alternatives:

| Schedule       | Cron Expression | Description                        |
| -------------- | --------------- | ---------------------------------- |
| Every 3 days   | `0 2 */3 * *`   | 2:00 AM UTC every 3 days (current) |
| Every 2 days   | `0 2 */2 * *`   | 2:00 AM UTC every 2 days           |
| Daily          | `0 2 * * *`     | Every day at 2:00 AM UTC           |
| Every 12 hours | `0 */12 * * *`  | Every 12 hours                     |
| Every 6 hours  | `0 */6 * * *`   | Every 6 hours                      |

## 🔒 Security

The endpoint is protected by a secret token:

- If `KEEPALIVE_SECRET_TOKEN` is set, the endpoint requires `?token=your-secret-token`
- If not set, the endpoint is publicly accessible (not recommended for production)

**Best Practice:** Always set `KEEPALIVE_SECRET_TOKEN` in production!

## 🐛 Troubleshooting

### Endpoint returns 404

- Make sure your app is deployed and running
- Verify the route is at `/api/keepalive`
- Check that your hosting platform supports API routes

### Endpoint returns 401 (Unauthorized)

- Check that the token in cron-job.org matches `KEEPALIVE_SECRET_TOKEN`
- Verify the URL includes `?token=your-secret-token`

### Endpoint returns 500 (Supabase not configured)

- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- Check your environment variables in your hosting platform

### Supabase still pauses

- Verify the cron job is actually running (check cron-job.org logs)
- Try a more frequent schedule (every 2 days or daily)
- Check that the query is successful (should return `{"success": true}`)

## 📝 Notes

- The endpoint performs a lightweight query on the `news` table
- It uses `head: true` to avoid fetching actual data
- The query is minimal and won't impact performance
- cron-job.org free tier allows 2 cron jobs (perfect for this use case)

## ✅ Success Indicators

You'll know it's working when:

- ✅ cron-job.org shows successful executions
- ✅ Supabase dashboard shows your project stays active
- ✅ No "project paused" messages in Supabase

---

**Need help?** Check the cron-job.org execution logs or your hosting platform's logs for detailed error messages.
