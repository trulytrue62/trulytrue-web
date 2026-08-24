export const reportContent = {
  page: {
    title: "Report a scam",
    description:
      "Help others stay safe by reporting a suspicious phone number, URL, email, or UPI ID.",
  },
  steps: {
    identifier: {
      title: "What are you reporting?",
      fieldLabel: "Phone number, URL, email, or UPI ID being reported",
      placeholder: "e.g. +1 555 0100, scam-site.com, name@bank",
      errors: {
        required: "Enter what you're reporting",
        undetected: "We couldn't tell if this is a phone number, URL, email, or UPI ID",
      },
    },
    details: {
      title: "Scam details",
      scamType: {
        label: "Type of scam",
        placeholder: "Select a category",
        error: "Select a scam category",
      },
      description: {
        label: "What happened?",
        placeholder: "Describe what happened, in as much detail as you can share.",
        error: "Please describe what happened in a bit more detail",
      },
      incidentDate: {
        label: "Date of the incident",
        placeholder: "Select date",
        error: "Select a date",
      },
      incidentTime: {
        label: "Time of the incident",
        error: "Enter a time",
      },
    },
    evidence: {
      title: "Evidence",
      fieldLabel: "Evidence (optional)",
    },
    review: {
      title: "Review & submit",
      rows: {
        reporting: "Reporting",
        scamType: "Scam type",
        description: "Description",
        evidence: "Evidence",
        incidentDateTime: "Incident date & time",
      },
    },
  },
  summary: {
    reportingLabel: "Reporting",
    viewSimilarReportsButton: "View similar reports",
  },
  similarReportsDrawer: {
    title: "Similar reports",
    searching: "Checking for matches…",
    noneFound: "No prior reports found for this identifier yet.",
    idle: "We'll check for matching reports once you enter what you're reporting.",
    resultPrefix: "other",
    resultSuffix: (count: number) => (count === 1 ? "report" : "reports"),
    resultLocation: "for this identifier",
  },
  actions: {
    back: "Back",
    next: "Next",
    submit: "Submit report",
  },
  success: {
    title: "Report submitted",
    description: "Thanks for helping keep others safe. We'll review this report shortly.",
  },
  footer: {
    reviewed: "Reviewed by our team",
    private: "Your identity stays private",
    location: "Location is aggregated, never exact",
  },
} as const
