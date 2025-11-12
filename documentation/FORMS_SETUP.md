# Web3Forms Setup Guide

This document explains how to set up Web3Forms for the contact form functionality.

## What is Web3Forms?

Web3Forms is a contact form backend service that allows you to receive form submissions via email without needing a server. It's perfect for static sites and provides:

- Email notifications for form submissions
- Spam protection
- File upload support
- Custom redirects
- Webhook support

## Setup Instructions

### 1. Get Your Access Key

1. Go to [Web3Forms](https://web3forms.com)
2. Click "Create Access Key"
3. Enter your email address where you want to receive form submissions
4. Verify your email address
5. Copy your access key

### 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
```

**Important**: Never commit your actual access key to version control!

### 3. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the submission

## Current Form Implementation

The contact form now includes:

### Working Features ✅
- **Form Submission**: Sends emails via Web3Forms API
- **Loading States**: Shows spinner during submission
- **Success Feedback**: Confirms successful submission
- **Error Handling**: Displays errors if submission fails
- **Form Reset**: Clears form after successful submission
- **Responsive Design**: Works on all devices

### Form Fields
- **Name**: Required field
- **Email**: Required, validates email format
- **Subject**: Required field
- **Message**: Required field

### Security Features
- Environment variable for access key
- Input sanitization
- Error handling for network issues
- Automatic form reset

## How to Get Your Web3Forms Access Key

### Step-by-Step Process:

1. **Visit Web3Forms**
   - Go to https://web3forms.com
   - Click "Get Started Free"

2. **Create Access Key**
   - Enter your email address (where you want to receive form submissions)
   - Click "Create Access Key"

3. **Verify Email**
   - Check your email inbox
   - Click the verification link

4. **Copy Access Key**
   - Once verified, you'll see your access key
   - Copy the key (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

5. **Update Environment File**
   - Open `.env` file in your project
   - Replace `YOUR_ACCESS_KEY_HERE` with your actual key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

6. **Restart Development Server**
   - Stop your dev server (Ctrl+C)
   - Run `npm run dev` again
   - Test the contact form

## Testing the Form

1. **Fill out the form** with test data
2. **Submit the form** - you should see a loading spinner
3. **Check for success message** - "Thank you! I'll get back to you soon."
4. **Check your email** - you should receive the form submission

## Troubleshooting

### Form Not Working?

1. **Check Console Errors**
   - Open browser developer tools (F12)
   - Look for error messages in Console tab

2. **Verify Access Key**
   - Make sure you copied the full access key
   - Check there are no extra spaces
   - Ensure the key is active on Web3Forms

3. **Check Network**
   - Ensure you have internet connection
   - Try submitting again

### Not Receiving Emails?

1. **Check Spam Folder**
2. **Verify Email Address** on Web3Forms
3. **Wait a Few Minutes** - sometimes there's a delay

## Production Deployment

When deploying to production:

1. **Set Environment Variable** on your hosting platform:
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables
   - Add: `VITE_WEB3FORMS_ACCESS_KEY` = `your_access_key`

2. **Test in Production** after deployment

## Form Customization

The form can be customized by modifying `src/components/contact.tsx`:

### Add More Fields
```javascript
// Add to formData state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '', // New field
  phone: ''    // New field
});

// Add to form submission
formDataToSubmit.append("company", formData.company);
formDataToSubmit.append("phone", formData.phone);
```

### Custom Email Subject
```javascript
formDataToSubmit.append("subject", `Portfolio Contact: ${formData.subject}`);
```

### Add Redirect After Submission
```javascript
formDataToSubmit.append("redirect", "https://yoursite.com/thank-you");
```

## Security Notes

- ✅ Access key is stored in environment variables
- ✅ Form data is sanitized before submission
- ✅ HTTPS is used for API calls
- ✅ Error handling prevents crashes
- ✅ No sensitive data is logged

## Support

- **Web3Forms Docs**: https://docs.web3forms.com
- **Web3Forms Support**: https://web3forms.com/support

Your contact form is now ready to receive real submissions! 🎉