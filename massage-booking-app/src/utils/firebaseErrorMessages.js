export function getFriendlyErrorMessage(errorCode) {
  const errorMap = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "That email is already registered.",
    "auth/weak-password": "Your password should be at least 6 characters.",
    "auth/missing-password": "Please enter your password.",
  };

  // Return a readable message if known, otherwise the original code
  return errorMap[errorCode] || "Something went wrong. Please try again.";
}
