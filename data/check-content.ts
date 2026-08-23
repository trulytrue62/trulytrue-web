export const checkContent = {
  page: {
    title: "Check",
  },
  greeting:
    "Hi! Paste anything suspicious, like a phone number, link, UPI ID, email, or message, and I'll check it against our community scam database and explain what I find.",
  composer: {
    placeholder: "Paste a phone number, link, email, UPI ID, or message…",
    send: "Send",
  },
  examples: [
    "+1 555 0134",
    "You've won a $500 gift card! Claim now: bit.ly/claim-prize",
    "scam-deals-store.com",
  ],
  analyzing: "Checking against our scam database…",
  verdict: {
    safe: {
      label: "Looks safe",
      description: "We didn't find anything concerning.",
    },
    suspicious: {
      label: "Suspicious",
      description: "Some warning signs, proceed carefully.",
    },
    unsafe: {
      label: "Not safe",
      description: "Strong signs of a scam.",
    },
  },
  actions: {
    viewSimilarReports: "View similar reports",
    report: "Report this",
  },
  similarReportsDrawerTitle: "Similar reports",
}
