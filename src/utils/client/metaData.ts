export  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export const meta = {
    url: baseUrl,
    title: process.env.NEXT_PUBLIC_META_TITLE || "Personal Website",
    description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Welcome to my personal website!",
}