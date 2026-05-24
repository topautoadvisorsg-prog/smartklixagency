# Smart Klix - Chat & Contact Form Setup Guide

## Overview
This guide will help you configure the Tidio chat widget and Formspree contact form integration.

---

## 📩 Step 1: Setup Formspree (Contact Form)

### 1.1 Create Formspree Account
1. Go to https://formspree.io
2. Click "Sign Up" and create your account
3. Verify your email address

### 1.2 Create a New Form
1. In your Formspree dashboard, click **"+ New Form"**
2. Configure the form:
   - **Form Name**: `Smart Klix Contact Form`
   - **Send notifications to**: Your email address (where you want to receive leads)
   - Click **"Create Form"**

### 1.3 Get Your Form Endpoint
1. After creating the form, you'll see your form endpoint
2. It looks like: `https://formspree.io/f/xeqwdryk`
3. Copy the form ID (e.g., `xeqwdryk`)

### 1.4 Add to Environment File
1. In your project root, create a `.env` file (copy from `.env.example`)
2. Add your Formspree endpoint:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ACTUAL_FORM_ID
```

Replace `YOUR_ACTUAL_FORM_ID` with your actual form ID from Formspree.

### 1.5 Formspree Features (Free Tier)
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ Spam filtering (automatic)
- ✅ Submission dashboard
- ✅ CSV export
- ✅ Source page tracking (already configured)

**Need more?** Upgrade at formspree.io/pricing

---

## 💬 Step 2: Setup Tidio (Chat Widget)

### 2.1 Create Tidio Account
1. Go to https://www.tidio.com
2. Click "Sign Up" and create your account
3. Choose your plan (Free tier available)

### 2.2 Configure Your Chatbot
1. After signing up, follow the setup wizard
2. Configure:
   - **Welcome message**: `Hi! How can we help you today?`
   - **Business hours**: Set your available hours
   - **Email notifications**: Enable to get notified of new messages

### 2.3 Get Your Public Key
1. Go to **Settings** (gear icon)
2. Navigate to **Developer** or **Installation**
3. Find your **Public Key** (long string like `abc123def456ghi789`)
4. Copy this key

### 2.4 Add to Environment File
Add your Tidio public key to the `.env` file:

```env
VITE_TIDIO_PUBLIC_KEY=your_actual_public_key_here
```

Replace `your_actual_public_key_here` with your Tidio public key.

### 2.5 Customize Widget Colors (Optional)
In Tidio dashboard:
1. Go to **Channels** > **Chat**
2. Click **"Customize"**
3. Set colors to match Smart Klix brand:
   - **Primary Color**: `#F4B400` (Smart Klix gold)
   - **Background**: `#0D1B2A` (navy blue)

### 2.6 Tidio Features (Free Tier)
- ✅ Live chat widget
- ✅ Chat history storage
- ✅ Mobile app for responding
- ✅ Email notifications
- ✅ Basic chatbot
- ✅ Persists across all pages (already configured)

---

## 🔧 Step 3: Test the Integration

### 3.1 Test Contact Form
1. Start your development server: `npm run dev`
2. Navigate to `/contact` page
3. Fill out the contact form with test data
4. Submit the form
5. Check:
   - ✅ Success message appears
   - ✅ Form resets after submission
   - ✅ You receive email notification from Formspree
   - ✅ Submission appears in Formspree dashboard

### 3.2 Test Chat Widget
1. Look for the Tidio chat widget in the bottom-right corner
2. Click to open the chat
3. Send a test message
4. Check:
   - ✅ Widget appears on all pages
   - ✅ Chat persists when navigating between pages
   - ✅ You receive notification in Tidio dashboard

### 3.3 Test Spam Protection
1. Submit the contact form
2. Try submitting again immediately
3. You should see: Console warning about spam protection
4. Wait 5 minutes before next submission is allowed

---

## 📁 Files Modified/Created

### New Files:
- `client/.env.example` - Environment variable template
- `client/src/components/TidioChat.tsx` - Chat widget loader
- `SETUP_GUIDE.md` - This file

### Modified Files:
- `client/src/components/ContactUs.tsx` - Added Formspree integration
- `client/src/App.tsx` - Added TidioChat component

---

## ⚙️ What's Already Configured

### Contact Form Features:
✅ **Form Validation**
- Email format validation
- Required fields (name, email, message)
- HTML5 validation attributes

✅ **Spam Protection**
- 5-minute cooldown between submissions
- Formspree server-side spam filtering

✅ **Source Tracking**
- Automatically captures which page user submitted from
- Included in email subject line
- Stored as hidden field in Formspree

✅ **User Feedback**
- Loading state during submission
- Success banner (green) on successful submission
- Error banner (red) on failure
- Auto-dismiss after 5 seconds

✅ **Mobile Responsive**
- Form works perfectly on all devices
- Tidio widget is mobile-friendly

### Chat Widget Features:
✅ **Async Loading**
- Doesn't block page load speed
- Loads after page renders

✅ **Global Persistence**
- Widget persists across all page navigations
- No re-initialization on route changes

✅ **Mobile Responsive**
- Automatically adjusts to mobile screens
- Touch-friendly interface

---

## 🚀 Production Deployment

### Environment Variables
When deploying to production, make sure to:
1. Add the same environment variables to your hosting platform
2. For Vercel: Add in Project Settings > Environment Variables
3. For Netlify: Add in Site Settings > Build & Deploy > Environment
4. For Replit: Add in Secrets tab

### Required Variables:
```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_TIDIO_PUBLIC_KEY=YOUR_TIDIO_KEY
```

---

## 🆘 Troubleshooting

### Contact Form Not Submitting
**Problem**: Form submission fails
**Solutions**:
1. Check `.env` file exists and has correct Formspree endpoint
2. Verify Formspree account is active
3. Check browser console for errors
4. Test Formspree endpoint directly using their dashboard

### Chat Widget Not Appearing
**Problem**: Tidio widget doesn't show
**Solutions**:
1. Check `.env` file has correct Tidio public key
2. Verify Tidio account is active
3. Check browser console for warning messages
4. Disable ad blockers (they sometimes block chat widgets)

### Form Submissions Not Received
**Problem**: Not getting email notifications
**Solutions**:
1. Check Formspree dashboard for submissions
2. Verify notification email is correct in Formspree settings
3. Check spam/junk folder
4. Test with a different email address

---

## 📊 Monitoring & Analytics

### Formspree Dashboard
- View all submissions at https://formspree.io
- Export to CSV
- See source page for each submission
- Filter by date range

### Tidio Dashboard
- View chat history
- See online/offline status
- Respond to messages via web or mobile app
- View visitor information

---

## 💡 Pro Tips

1. **Customize Email Notifications**: In Formspree, customize the email template to include all form fields
2. **Set Auto-Reply**: Configure Tidio to send automatic replies when you're offline
3. **Mobile App**: Download Tidio mobile app to respond to chats on the go
4. **Integration**: Formspree can integrate with Google Sheets, Slack, Zapier, etc.
5. **Upgrade When Ready**: Both services offer affordable paid tiers for growing businesses

---

## ✅ Success Checklist

- [ ] Formspree account created
- [ ] Formspree form endpoint added to `.env`
- [ ] Test submission received via email
- [ ] Tidio account created
- [ ] Tidio public key added to `.env`
- [ ] Chat widget appears on all pages
- [ ] Test message sent and received in Tidio
- [ ] Spam protection working (5-min cooldown)
- [ ] Mobile responsiveness verified
- [ ] Production environment variables configured

---

## 📞 Need Help?

- **Formspree Support**: https://help.formspree.io
- **Tidio Support**: https://www.tidio.com/help
- **Project Issues**: Check browser console for error messages

---

**Last Updated**: April 2026
**Status**: ✅ Fully Implemented & Ready for Configuration
