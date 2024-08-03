import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "warning": "#FEE75C",
                "success": "#57F287",
                "error": "#ED4245",
                "accent": "#557afc",
                "lite-black": "#111111",
            }
        },
    },
    plugins: [],
};
export default config;
