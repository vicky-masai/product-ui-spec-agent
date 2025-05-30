
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { GeneratedUiOutput, UiConcept, KeyScreenDetail, ReusableUiComponent, VisualStyleGuide, UiElementDetail, ColorPaletteEntry, TypographyStyle, IconographyStyle } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const IMAGE_MODEL_NAME = 'imagen-3.0-generate-002';

const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

const PROMPT_FOR_UI_GENERATION_AND_IMAGE_PROMPTS = `
You are an expert UI/UX designer, product strategist, and prompt engineer with deep knowledge of Figma and AI image generation.
Analyze the content of the provided product documentation (PDF).
Based on your analysis, generate a comprehensive UI/UX design specification for both a web application and a mobile application.

For each application (web and mobile), provide the following in detail:

1.  **description**: A concise description of the application's purpose, derived from the document.
2.  **targetAudience**: A brief description of the primary target audience.
3.  **coreFunctionality**: An array of strings listing the main functionalities.
4.  **keyScreens**: An array of objects, each representing a key screen (aim for 3-5 important screens). Each screen object should contain:
    *   **name**: (string) The name of the screen (e.g., "Dashboard", "Product Detail Page", "User Profile").
    *   **purpose**: (string) The main goal or objective of this screen.
    *   **userFlow**: (string, optional) A brief description of how a user might arrive at this screen and what they might do next.
    *   **informationArchitecture**: (array of strings, optional) Key information elements or groups displayed on this screen.
    *   **uiElements**: (array of objects) Specific UI elements on this screen. Each element object should have:
        *   **element**: (string) Name of the UI element (e.g., "Header", "Search Bar", "Product Card Grid", "Call to Action Button").
        *   **description**: (string) What this element does or displays.
        *   **layoutNotes**: (string, optional) Suggestions for its placement or arrangement (e.g., "Fixed at the top of the screen", "Centered content area").
        *   **figmaSuggestion**: (string, optional) Tip for Figma (e.g., "Use Auto Layout", "Create component with variants").
5.  **mainUiComponents**: An array of objects for reusable UI components that would be common across multiple screens. Each component object should have:
    *   **componentName**: (string) (e.g., "Standard Button", "Modal Dialog", "Navigation Menu").
    *   **description**: (string) Its purpose and general appearance.
    *   **usageExamples**: (array of strings, optional) Where this component might be used.
    *   **figmaSuggestion**: (string, optional) Tip for Figma (e.g., "Define variants for states: default, hover, disabled, loading").
6.  **visualStyleGuide**: An object detailing the visual design:
    *   **colorPalette**: (array of objects) Define key colors. Each object:
        *   **name**: (string) (e.g., "Primary", "Secondary", "Accent", "Background", "Text-Primary", "Text-Secondary", "Success", "Error", "Warning").
        *   **hex**: (string) Hex code (e.g., "#3B82F6") or a descriptive Tailwind-like name (e.g., "blue-500").
        *   **usage**: (string) How this color is typically used (e.g., "Main call-to-actions, active navigation", "Borders, subtle backgrounds").
    *   **typography**: (object)
        *   **headingFont**: (string) Suggested font family for headings (e.g., "Inter", "Roboto Slab").
        *   **bodyFont**: (string) Suggested font family for body text (e.g., "Inter", "Open Sans").
        *   **notes**: (string, optional) General typography advice (e.g., "Establish a clear type scale. Ensure WCAG AA contrast.").
    *   **iconography**: (object)
        *   **style**: (string) Suggested icon style (e.g., "Line icons - 1.5px stroke", "Solid filled icons", "Minimalist outline").
        *   **librarySuggestion**: (string, optional) (e.g., "Heroicons", "Feather Icons", "Material Symbols").
        *   **notes**: (string, optional) (e.g., "Maintain consistent style and size").
    *   **overallMood**: (string) A few words describing the desired aesthetic (e.g., "Clean, modern, and professional", "Friendly, approachable, and vibrant").
    *   **componentStylingNotes**: (string, optional) General notes for component appearance (e.g., "Buttons: 8px corner radius, subtle hover shadow. Cards: 12px radius, 1px border.").
    *   **spacingSystem**: (string, optional) Suggested spacing approach (e.g., "Use an 8px grid system for margins and paddings.").
7.  **figmaImplementationStrategy**: (array of strings, optional) High-level tips for setting up the design in Figma (e.g., "Create a shared library for styles and components", "Use Auto Layout extensively for responsive elements", "Define page templates").
8.  **uiImageGenerationPrompt**: A single, highly descriptive prompt (around 70-120 words) for an AI image generation model (like Imagen) to create a visually representative UI DESIGN MOCKUP or STYLED WIREFRAME of the application's main UI or a key screen. This prompt must detail elements, layout, style, color themes, and overall composition to guide the image generator effectively for a design-oriented output. Example: "UI design mockup of a financial analytics dashboard, dark theme, sidebar navigation with glowing icons, data visualization charts with vibrant blues and purples, key metric cards with bold typography, professional and sophisticated aesthetic."

Return your response STRICTLY in the following JSON format. Do not include any explanatory text, markdown formatting for the JSON block itself, or any other content outside the JSON structure. Ensure all specified fields are present even if their value is an empty array or a default string if no specific information can be derived.

{
  "webApp": { /* structure as defined above */ },
  "mobileApp": { /* structure as defined above */ }
}
`;

type ParsedUiOutputWithImagePrompts = {
  webApp: Omit<UiConcept, 'generatedImageBase64'>;
  mobileApp: Omit<UiConcept, 'generatedImageBase64'>;
};

function validateUiElementDetail(element: any, path: string): element is UiElementDetail {
  if (!element || typeof element !== 'object') return false;
  if (typeof element.element !== 'string' || !element.element) {
    console.error(`Validation Error: ${path}.element is missing or not a string.`);
    return false;
  }
  if (typeof element.description !== 'string' || !element.description) {
    console.error(`Validation Error: ${path}.description is missing or not a string.`);
    return false;
  }
  return true;
}

function validateKeyScreenDetail(screen: any, path: string): screen is Omit<KeyScreenDetail, 'generatedImageBase64'> {
  if (!screen || typeof screen !== 'object') return false;
  if (typeof screen.name !== 'string' || !screen.name) {
    console.error(`Validation Error: ${path}.name is missing or not a string.`);
    return false;
  }
  if (typeof screen.purpose !== 'string' || !screen.purpose) {
    console.error(`Validation Error: ${path}.purpose is missing or not a string.`);
    return false;
  }
  if (!Array.isArray(screen.uiElements) || !screen.uiElements.every((el: any, i: number) => validateUiElementDetail(el, `${path}.uiElements[${i}]`))) {
     console.error(`Validation Error: ${path}.uiElements is not a valid array of UiElementDetail.`);
    return false;
  }
  return true;
}

function validateReusableUiComponent(component: any, path: string): component is ReusableUiComponent {
   if (!component || typeof component !== 'object') return false;
   if (typeof component.componentName !== 'string' || !component.componentName) {
     console.error(`Validation Error: ${path}.componentName is missing or not a string.`);
     return false;
   }
   if (typeof component.description !== 'string' || !component.description) {
      console.error(`Validation Error: ${path}.description is missing or not a string.`);
      return false;
   }
   return true;
}

function validateColorPaletteEntry(entry: any, path: string): entry is ColorPaletteEntry {
    if (!entry || typeof entry !== 'object') return false;
    if (typeof entry.name !== 'string' || !entry.name) {
      console.error(`Validation Error: ${path}.name is missing or not a string.`);
      return false;
    }
    if (typeof entry.hex !== 'string' || !entry.hex) {
      console.error(`Validation Error: ${path}.hex is missing or not a string.`);
      return false;
    }
    if (typeof entry.usage !== 'string' || !entry.usage) {
      console.error(`Validation Error: ${path}.usage is missing or not a string.`);
      return false;
    }
    return true;
}

function validateTypographyStyle(typography: any, path: string): typography is TypographyStyle {
    if (!typography || typeof typography !== 'object') return false;
    if (typeof typography.headingFont !== 'string' || !typography.headingFont) {
       console.error(`Validation Error: ${path}.headingFont is missing or not a string.`);
       return false;
    }
    if (typeof typography.bodyFont !== 'string' || !typography.bodyFont) {
       console.error(`Validation Error: ${path}.bodyFont is missing or not a string.`);
       return false;
    }
    return true;
}
function validateIconographyStyle(iconography: any, path: string): iconography is IconographyStyle {
    if (!iconography || typeof iconography !== 'object') return false;
    if (typeof iconography.style !== 'string' || !iconography.style) {
      console.error(`Validation Error: ${path}.style is missing or not a string.`);
      return false;
    }
    return true;
}

function validateVisualStyleGuide(guide: any, path: string): guide is VisualStyleGuide {
  if (!guide || typeof guide !== 'object') return false;
  if (!Array.isArray(guide.colorPalette) || !guide.colorPalette.every((cp: any, i: number) => validateColorPaletteEntry(cp, `${path}.colorPalette[${i}]`))) {
     console.error(`Validation Error: ${path}.colorPalette is not a valid array of ColorPaletteEntry.`);
     return false;
  }
  if (!validateTypographyStyle(guide.typography, `${path}.typography`)) return false;
  if (!validateIconographyStyle(guide.iconography, `${path}.iconography`)) return false;
  if (typeof guide.overallMood !== 'string' || !guide.overallMood) {
    console.error(`Validation Error: ${path}.overallMood is missing or not a string.`);
    return false;
  }
  return true;
}


function validateConceptStructure(concept: any, platform: string): concept is Omit<UiConcept, 'generatedImageBase64'> {
  if (!concept || typeof concept !== 'object') {
    console.error(`Validation Error: ${platform} concept is null or not an object.`);
    return false;
  }
  const path = platform;

  if (typeof concept.description !== 'string' || !concept.description) {
    console.error(`Validation Error: ${path}.description is missing or not a string.`);
    return false;
  }
  if (!Array.isArray(concept.keyScreens) || !concept.keyScreens.every((ks: any, i: number) => validateKeyScreenDetail(ks, `${path}.keyScreens[${i}]`))) {
     console.error(`Validation Error: ${path}.keyScreens is not a valid array of KeyScreenDetail.`);
    return false;
  }
  if (!Array.isArray(concept.mainUiComponents) || !concept.mainUiComponents.every((comp: any, i: number) => validateReusableUiComponent(comp, `${path}.mainUiComponents[${i}]`))) {
     console.error(`Validation Error: ${path}.mainUiComponents is not a valid array of ReusableUiComponent.`);
    return false;
  }
  if (!validateVisualStyleGuide(concept.visualStyleGuide, `${path}.visualStyleGuide`)) return false;
  
  if (typeof concept.uiImageGenerationPrompt !== 'string' || !concept.uiImageGenerationPrompt) {
     console.error(`Validation Error: ${path}.uiImageGenerationPrompt is missing or not a string.`);
    return false;
  }
  // Optional fields can be checked for type if present
  if (concept.targetAudience && typeof concept.targetAudience !== 'string') {
    console.error(`Validation Error: ${path}.targetAudience is not a string.`); return false;
  }
  if (concept.coreFunctionality && !Array.isArray(concept.coreFunctionality)) {
     console.error(`Validation Error: ${path}.coreFunctionality is not an array.`); return false;
  }
  if (concept.figmaImplementationStrategy && !Array.isArray(concept.figmaImplementationStrategy)) {
     console.error(`Validation Error: ${path}.figmaImplementationStrategy is not an array.`); return false;
  }

  return true;
}


export const generateUiIdeasFromPdf = async (
  pdfBase64: string, 
  fileName: string,
  setLoadingMessage: (message: string) => void
): Promise<GeneratedUiOutput> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("API Key not found. Please set the API_KEY environment variable.");
    throw new Error("API Key is not configured. Cannot connect to AI service.");
  }

  const ai = new GoogleGenAI({ apiKey });

  let parsedTextData: ParsedUiOutputWithImagePrompts;

  try {
    setLoadingMessage("Generating detailed UI design specs & image prompts...");
    const textResponse: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: 'application/pdf', data: pdfBase64 } },
          { text: PROMPT_FOR_UI_GENERATION_AND_IMAGE_PROMPTS }
        ]
      },
      config: {
        responseMimeType: "application/json",
      }
    });
    
    let jsonStr = textResponse.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      parsedTextData = JSON.parse(jsonStr) as ParsedUiOutputWithImagePrompts;
      
      if (!parsedTextData || !parsedTextData.webApp || !parsedTextData.mobileApp || 
          !validateConceptStructure(parsedTextData.webApp, "webApp") || 
          !validateConceptStructure(parsedTextData.mobileApp, "mobileApp")) {
            console.error("Raw AI text response for debugging (structure error):", textResponse.text);
            throw new Error("AI text response has an unexpected or incomplete structure. Check console for details.");
      }
    } catch (e) {
      console.error("Failed to parse JSON text response from AI or validate its detailed structure:", e);
      console.error("Raw AI text response for debugging (parse/validation error):", textResponse.text);
      let message = "Failed to parse AI text response. The response was not valid JSON or did not match the expected detailed structure.";
      if (e instanceof Error) {
        message += ` Details: ${e.message}`;
      }
      throw new Error(message);
    }

  } catch (error) {
    console.error("Error calling Gemini API for text generation:", error);
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes("api key not valid") || error.message.toLowerCase().includes("invalid api key")) {
             throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
        }
         throw new Error(`Failed to generate UI design specifications: ${error.message}`);
    }
    throw new Error(`Failed to generate UI design specifications: ${String(error)}`);
  }

  // Stage 2: Generate Images
  let webImageBase64: string | null = null;
  let mobileImageBase64: string | null = null;

  try {
    if (parsedTextData.webApp.uiImageGenerationPrompt) {
      setLoadingMessage("Generating Web UI preview image...");
      const webImageResponse = await ai.models.generateImages({
        model: IMAGE_MODEL_NAME,
        prompt: parsedTextData.webApp.uiImageGenerationPrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
      });
      if (webImageResponse.generatedImages && webImageResponse.generatedImages.length > 0) {
        webImageBase64 = webImageResponse.generatedImages[0].image.imageBytes;
      } else {
        console.warn("Web UI image generation did not return an image.");
      }
    }
  } catch (error) {
    console.error("Error generating Web UI image:", error);
    // Don't throw, allow text concepts to still be shown. Error will be logged.
  }

  try {
    if (parsedTextData.mobileApp.uiImageGenerationPrompt) {
      setLoadingMessage("Generating Mobile UI preview image...");
      const mobileImageResponse = await ai.models.generateImages({
        model: IMAGE_MODEL_NAME,
        prompt: parsedTextData.mobileApp.uiImageGenerationPrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
      });
      if (mobileImageResponse.generatedImages && mobileImageResponse.generatedImages.length > 0) {
        mobileImageBase64 = mobileImageResponse.generatedImages[0].image.imageBytes;
      } else {
         console.warn("Mobile UI image generation did not return an image.");
      }
    }
  } catch (error) {
    console.error("Error generating Mobile UI image:", error);
    // Don't throw.
  }
  
  setLoadingMessage("Finalizing results...");

  return {
    webApp: {
      ...parsedTextData.webApp,
      generatedImageBase64: webImageBase64,
    },
    mobileApp: {
      ...parsedTextData.mobileApp,
      generatedImageBase64: mobileImageBase64,
    },
  };
};
