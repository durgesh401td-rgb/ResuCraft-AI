import { FontType, SpacingType } from '../../types/resume';

export const FONT_CLASSES: Record<FontType, string> = {
  inter: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  display: 'font-display',
  roboto: 'font-sans',
};

export const SPACING_CLASSES: Record<SpacingType, { sectionGap: string; itemGap: string; bulletGap: string }> = {
  compact: {
    sectionGap: 'space-y-3 mb-3',
    itemGap: 'space-y-2 mb-2',
    bulletGap: 'space-y-0.5',
  },
  normal: {
    sectionGap: 'space-y-4 mb-4',
    itemGap: 'space-y-3 mb-3',
    bulletGap: 'space-y-1',
  },
  relaxed: {
    sectionGap: 'space-y-6 mb-6',
    itemGap: 'space-y-4 mb-4',
    bulletGap: 'space-y-1.5',
  },
};

export const COLOR_PRESETS = [
  { id: 'indigo', name: 'Royal Indigo', hex: '#4f46e5' },
  { id: 'blue', name: 'Ocean Blue', hex: '#0284c7' },
  { id: 'slate', name: 'Executive Slate', hex: '#334155' },
  { id: 'emerald', name: 'Emerald Pine', hex: '#059669' },
  { id: 'crimson', name: 'Ruby Crimson', hex: '#dc2626' },
  { id: 'purple', name: 'Imperial Violet', hex: '#7c3aed' },
  { id: 'teal', name: 'Cyber Teal', hex: '#0d9488' },
  { id: 'charcoal', name: 'Pure Onyx', hex: '#18181b' },
];
