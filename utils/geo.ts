export function detectApproximateRegion(): string {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region
    if (!region) {
      return ""
    }
    return new Intl.DisplayNames(["en"], { type: "region" }).of(region) ?? ""
  } catch {
    return ""
  }
}
