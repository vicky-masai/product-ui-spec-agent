
export interface ColorPaletteEntry {
  name: string; // e.g., Primary, Secondary, Accent, Background, Text, Success, Error
  hex: string;  // e.g., #RRGGBB or descriptive (e.g. "slate-800")
  usage: string; // e.g., "Buttons, active states", "Secondary text, borders"
}

export interface TypographyStyle {
  headingFont: string; // Font family suggestion for headings
  bodyFont: string;    // Font family suggestion for body text
  notes?: string;       // General typography notes, e.g., "Ensure good contrast and readability"
}

export interface IconographyStyle {
  style: string; // e.g., 'Line icons', 'Filled icons', 'Minimalist', 'Duotone'
  librarySuggestion?: string; // e.g., 'Material Icons, Heroicons, Font Awesome'
  notes?: string; // e.g., "Use consistently throughout the application"
}

export interface VisualStyleGuide {
  colorPalette: ColorPaletteEntry[];
  typography: TypographyStyle;
  iconography: IconographyStyle;
  overallMood: string; // e.g., 'Modern and clean', 'Playful and vibrant', 'Corporate and trustworthy'
  componentStylingNotes?: string; // General notes like 'Buttons: rounded corners, subtle shadow. Cards: slight border, padding.'
  spacingSystem?: string; // e.g., "4px grid system" or "Use consistent spacing multiples (8px, 16px, 24px)"
}

export interface UiElementDetail {
  element: string; // e.g., 'Header', 'Navigation Bar', 'Product Card', 'Search Input', 'Primary Button'
  description: string; // What it does or shows
  layoutNotes?: string; // e.g., 'Fixed at top', 'Below header, spans full width', 'Arranged in a 2-column grid'
  figmaSuggestion?: string; // e.g., 'Use Auto Layout for alignment', 'Create as a component with variants for states (default, hover, disabled)'
}

export interface KeyScreenDetail {
  name: string;
  purpose: string; // Purpose of the screen
  userFlow?: string; // How user gets here and what they do next
  informationArchitecture?: string[]; // Key information elements/groups to be displayed on this screen
  uiElements: UiElementDetail[]; // Specific UI elements on this screen
}

export interface ReusableUiComponent {
  componentName: string;
  description: string;
  usageExamples?: string[]; // Where it might be used (e.g., "User Profile Avatar", "Data Table Row")
  figmaSuggestion?: string; // e.g., "Build as a flexible component with slots", "Define variants for size and state"
}

export interface UiConcept {
  description: string; // Overall app description derived from PDF
  targetAudience?: string; // Deduced target audience
  coreFunctionality?: string[]; // List of core functionalities based on PDF
  keyScreens: KeyScreenDetail[];
  mainUiComponents: ReusableUiComponent[]; // Common reusable components across screens
  visualStyleGuide: VisualStyleGuide;
  figmaImplementationStrategy?: string[]; // General high-level Figma strategy tips
  uiImageGenerationPrompt: string; // Prompt for the image generation model (emphasize UI mockup style)
  generatedImageBase64: string | null; // Base64 string of the generated image
}

export interface GeneratedUiOutput {
  webApp: UiConcept;
  mobileApp: UiConcept;
}
