export const checkInputContent = {
  description:
    "Paste a phone number, link, email, UPI ID, message or upload a screenshot to check it against community reports.",
  suggestions: [
    {
      description: "Check a phone number",
      example: "+91 98765 43210",
    },
    {
      description: "Check a link",
      example: "bit.ly/claim-prize",
    },
    {
      description: "Check an email",
      example: "support@bank-verify.com",
    },
    {
      description: "Check a message",
      example: "You've won a lottery, click here to claim",
    },
  ],
  placeholderReply:
    "🟡 SUSPICIOUS — real-time checking isn't wired up yet, this is a placeholder result. Once live, this will combine community reports and AI analysis and explain why.",
  noMessageFallback: "(screenshot only, no message)",
}
