import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResendInstance(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    
    // During build, if API key is missing, Resend constructor will throw
    // We need to provide a valid format to prevent build errors
    // The actual email sending will be checked in VerificationEmail.ts
    if (!apiKey) {
      // Resend API keys format: re_ followed by alphanumeric string (typically 32+ chars)
      // Using a placeholder that matches the expected format
      resendInstance = new Resend("re_build_placeholder_do_not_use_in_production_12345");
    } else {
      resendInstance = new Resend(apiKey);
    }
  }
  return resendInstance;
}

// Export resend object with lazy initialization via getter
// This ensures Resend is only instantiated when actually accessed (at runtime)
export const resend = {
  get emails() {
    return getResendInstance().emails;
  }
};