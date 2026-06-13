import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Monochromatic + Dual Accent Theme
				bg: {
					void: '#000000',
					deep: '#0A0A0A',
					surface: '#1A1A1A',
					elevated: '#262626',
				},
				border: {
					subtle: 'rgba(255, 255, 255, 0.08)',
					medium: 'rgba(255, 255, 255, 0.15)',
					strong: 'rgba(255, 255, 255, 0.25)',
				},
				accent: {
					// Primary Accent - Vibrant Crimson (Reference Match)
					primary: '#E61E32',
					crimson: '#E61E32',
					'crimson-bright': '#FF2A42', // Brighter relative to E61E32
					'crimson-dim': '#B91325',     // Dimmer relative to E61E32

					// Secondary Accent - Electric Cyan
					secondary: '#06B6D4',
					cyan: '#06B6D4',
					'cyan-bright': '#22D3EE',
					'cyan-dim': '#0891B2',

					// Glow effects
					glow: 'rgba(230, 30, 50, 0.4)',
					'crimson-glow': 'rgba(230, 30, 50, 0.4)',
					'cyan-glow': 'rgba(6, 182, 212, 0.25)',
				},
				text: {
					primary: '#FFFFFF',
					secondary: '#A3A3A3',
					muted: '#525252',
				},
			},
			fontFamily: {
				display: ['var(--font-inter-tight)', 'Inter Tight', 'sans-serif'],
				body: ['var(--font-inter)', 'Inter', 'sans-serif'],
			},
			spacing: {
				'xs': '0.5rem',
				'sm': '0.75rem',
				'md': '1rem',
				'lg': '1.5rem',
				'xl': '2rem',
				'2xl': '3rem',
				'3xl': '4rem',
				'4xl': '6rem',
				'5xl': '8rem',
				'6xl': '12rem',
			},
			borderRadius: {
				'sm': '0.75rem',
				'md': '1rem',
				'lg': '1.5rem',
				'xl': '2rem',
			},
			boxShadow: {
				'glow-subtle': '0 0 30px rgba(230, 30, 50, 0.3)',
				'glow-medium': '0 0 50px rgba(230, 30, 50, 0.5)',
				'glow-strong': '0 0 80px rgba(230, 30, 50, 0.6)',
				'glow-cyan-subtle': '0 0 30px rgba(6, 182, 212, 0.25)',
				'glow-cyan-medium': '0 0 50px rgba(6, 182, 212, 0.35)',
				'glow-cyan-strong': '0 0 80px rgba(6, 182, 212, 0.45)',
				'depth-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
				'depth-elevated': '0 16px 48px rgba(0, 0, 0, 0.5)',
				'text-glow': '0 0 40px rgba(255, 255, 255, 0.3)',
			},
			textShadow: {
				'cinematic': '0 4px 20px rgba(0, 0, 0, 0.8)',
				'dramatic': '0 8px 40px rgba(0, 0, 0, 0.9)',
			},
			animation: {
				'fade-up': 'fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'fade-left': 'fadeInLeft 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'scale-in': 'scaleIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'glow-pulse': 'glowPulse 3s ease-in-out infinite',
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-40px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				glowPulse: {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '1' },
				},
			},
			transitionTimingFunction: {
				'ghost-primary': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'ghost-secondary': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
			transitionDuration: {
				'primary': '600ms',
				'secondary': '400ms',
				'hover': '300ms',
			},
			backdropBlur: {
				'ghost': '12px',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
