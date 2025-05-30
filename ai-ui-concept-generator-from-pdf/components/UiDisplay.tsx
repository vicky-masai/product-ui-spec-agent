
import React from 'react';
import type { UiConcept, VisualStyleGuide, KeyScreenDetail, ReusableUiComponent, UiElementDetail, ColorPaletteEntry } from '../types';

// --- Icon Components ---
const IconBase: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {children}
  </svg>
);
const PhotoIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.225.225 0 0 1 .225-.225h.008a.225.225 0 0 1 .225.225v.008a.225.225 0 0 1-.225.225h-.008a.225.225 0 0 1-.225-.225V8.25Z" /></IconBase>;
const PencilSquareIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></IconBase>;
const UsersIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></IconBase>;
const BoltIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></IconBase>;
const ComputerDesktopIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h9.75a2.25 2.25 0 0 1 2.25 2.25Z" /></IconBase>;
const ArrowPathIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691v4.992m0 0H9.345m0 0-3.181-3.183a8.25 8.25 0 0 1 11.667 0l3.181 3.183" /></IconBase>;
const QueueListIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></IconBase>;
const RectangleStackIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0l5.571 3-5.571 3m0 0l-5.571-3 5.571-3" /></IconBase>;
const Square2StackIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.393-.03.797-.03 1.191 0l.092.004c1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V15M15.75 7.5V15M8.25 15H3.375c-.621 0-1.125-.504-1.125-1.125V9.375c0-.621.504-1.125 1.125-1.125H8.25m0 0V7.5m0 7.5h7.5M15.75 15V7.5" /></IconBase>;
const PaintBrushIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></IconBase>;
const SwatchIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5L12 9l-4.5-4.5L12 0l4.5 4.5ZM16.5 4.5c0 3.314-2.25 6-5.25 6S6 7.814 6 4.5S8.25 0 12 0s4.5 1.186 4.5 4.5ZM12 21l-6-6h12l-6 6ZM12 21V9" /></IconBase>;
const LanguageIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.11M9 5.25V3m3.334 2.364C13.186 6.056 14.089 6.5 15 6.5c.91 0 1.813-.444 2.666-.936m0 0V3m0 2.064A48.35 48.35 0 0 1 18 5.25c.209 0 .42-.003.626-.009V3m0 2.25a48.618 48.618 0 0 1 1.874.375M3 21v-6.5c0-1.18.94-2.187 2.121-2.43M3 21h6m0 0v-2.5c0-1.18.94-2.187 2.121-2.43m0 0c.715-.154 1.43-.257 2.156-.318V3m0 0M9 3v2.25M15 21h6m-6 0v-2.5c0-1.18-.94-2.187-2.121-2.43m0 0a48.47 48.47 0 0 1-1.053-.065c-.715-.045-1.43-.084-2.156-.108V3m0 0L12 3" /></IconBase>;
const SparklesIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></IconBase>;
const LightBulbIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a.75.75 0 0 0 .75-.75V11.25a.75.75 0 0 0-1.5 0v6A.75.75 0 0 0 12 18ZM12 5.25A.75.75 0 0 1 12.75 6v1.5a.75.75 0 0 1-1.5 0V6A.75.75 0 0 1 12 5.25ZM5.25 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Zm12 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-3.214-4.714a.75.75 0 1 1 1.06 1.06l-1.06-1.06Zm-6.122 6.122a.75.75 0 1 1 1.06 1.06l-1.06-1.06ZM14.25 7.5A.75.75 0 0 1 15 6.75V6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v.75A.75.75 0 0 1 6.75 7.5h7.5Z" /></IconBase>;
const CubeTransparentIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></IconBase>;

// --- UI Helper Components ---
interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, icon, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="mb-3 border-b border-slate-600 pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-lg font-medium text-slate-100 mb-2 flex items-center justify-between hover:text-primary-300 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-primary-400">{icon}</span>}
          {title}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && <div className="text-slate-300 text-sm leading-relaxed pl-1 mt-1">{children}</div>}
    </div>
  );
};

const TagList: React.FC<{ items: string[] | undefined; className?: string }> = ({ items, className = "bg-primary-700 text-primary-200" }) => {
  if (!items || items.length === 0) return <p className="text-slate-400 italic text-xs">Not specified.</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span key={index} className={`px-2 py-1 text-xs rounded-full ${className}`}>
          {item}
        </span>
      ))}
    </div>
  );
};

// --- Detailed Display Components ---

const VisualStyleGuideDisplay: React.FC<{ guide: VisualStyleGuide }> = ({ guide }) => (
  <>
    <InfoSection title="Overall Mood & Style" icon={<PaintBrushIcon />} defaultOpen={false}>
      <p><strong>Mood:</strong> {guide.overallMood || "Not specified"}</p>
      {guide.componentStylingNotes && <p className="mt-2"><strong>Component Styling:</strong> {guide.componentStylingNotes}</p>}
      {guide.spacingSystem && <p className="mt-2"><strong>Spacing System:</strong> {guide.spacingSystem}</p>}
    </InfoSection>

    <InfoSection title="Color Palette" icon={<SwatchIcon />} defaultOpen={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guide.colorPalette.map((color, index) => (
          <div key={index} className="bg-slate-600 p-3 rounded-md shadow">
            <div className="flex items-center mb-1">
              <span 
                className="w-5 h-5 rounded-full mr-2 border border-slate-400" 
                style={{ backgroundColor: color.hex.startsWith('#') ? color.hex : `var(--color-${color.hex.replace('-','--')})` /* For tailwind descriptive names if needed */}}
                title={color.hex}
              ></span>
              <strong className="text-primary-300">{color.name}</strong> ({color.hex})
            </div>
            <p className="text-xs text-slate-300">{color.usage}</p>
          </div>
        ))}
      </div>
    </InfoSection>

    <InfoSection title="Typography" icon={<LanguageIcon />} defaultOpen={false}>
      <div className="bg-slate-600 p-3 rounded-md shadow">
        <p><strong>Heading Font:</strong> {guide.typography.headingFont || "Not specified"}</p>
        <p><strong>Body Font:</strong> {guide.typography.bodyFont || "Not specified"}</p>
        {guide.typography.notes && <p className="mt-1 text-xs"><em>Notes: {guide.typography.notes}</em></p>}
      </div>
    </InfoSection>

    <InfoSection title="Iconography" icon={<SparklesIcon />} defaultOpen={false}>
       <div className="bg-slate-600 p-3 rounded-md shadow">
        <p><strong>Style:</strong> {guide.iconography.style || "Not specified"}</p>
        {guide.iconography.librarySuggestion && <p><strong>Library Suggestion:</strong> {guide.iconography.librarySuggestion}</p>}
        {guide.iconography.notes && <p className="mt-1 text-xs"><em>Notes: {guide.iconography.notes}</em></p>}
      </div>
    </InfoSection>
  </>
);

const UiElementDisplay: React.FC<{ element: UiElementDetail }> = ({ element }) => (
  <div className="bg-slate-650 p-3 rounded-md shadow mb-2">
    <h5 className="font-semibold text-primary-300">{element.element}</h5>
    <p className="text-xs mb-1">{element.description}</p>
    {element.layoutNotes && <p className="text-xs text-slate-400"><em>Layout: {element.layoutNotes}</em></p>}
    {element.figmaSuggestion && <p className="text-xs text-slate-400"><em>Figma: {element.figmaSuggestion}</em></p>}
  </div>
);

const KeyScreenItemDisplay: React.FC<{ screen: KeyScreenDetail }> = ({ screen }) => (
  <div className="bg-slate-600 p-4 rounded-lg shadow mb-4">
    <h4 className="text-lg font-semibold text-primary-300 mb-2">{screen.name}</h4>
    <p className="text-xs text-slate-400 mb-1"><strong>Purpose:</strong> {screen.purpose}</p>
    {screen.userFlow && <InfoSection title="User Flow" icon={<ArrowPathIcon />} defaultOpen={false}><p className="text-xs">{screen.userFlow}</p></InfoSection>}
    {screen.informationArchitecture && screen.informationArchitecture.length > 0 && (
      <InfoSection title="Information Architecture" icon={<QueueListIcon />} defaultOpen={false}>
        <TagList items={screen.informationArchitecture} className="bg-slate-500 text-slate-200 text-xs" />
      </InfoSection>
    )}
    <InfoSection title="UI Elements" icon={<RectangleStackIcon />} defaultOpen={false}>
      {screen.uiElements.map((el, idx) => <UiElementDisplay key={idx} element={el} />)}
    </InfoSection>
  </div>
);

const ReusableUiComponentDisplay: React.FC<{ component: ReusableUiComponent }> = ({ component }) => (
 <div className="bg-slate-600 p-3 rounded-lg shadow mb-3">
    <h4 className="font-semibold text-primary-300">{component.componentName}</h4>
    <p className="text-xs mb-1">{component.description}</p>
    {component.usageExamples && component.usageExamples.length > 0 && (
      <div className="mt-1">
        <strong className="text-xs text-slate-400">Usage Examples:</strong>
        <TagList items={component.usageExamples} className="bg-slate-500 text-slate-200 text-xs mt-1" />
      </div>
    )}
    {component.figmaSuggestion && <p className="text-xs text-slate-400 mt-1"><em>Figma: {component.figmaSuggestion}</em></p>}
  </div>
);

// --- Main Concept Card ---
const ConceptCard: React.FC<{ title: string; concept: UiConcept }> = ({ title, concept }) => {
  if (!concept) return null;

  return (
    <div className="bg-slate-700 shadow-xl rounded-xl p-4 sm:p-6 my-6 transform transition-all hover:shadow-primary-500/30 duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-primary-400">{title}</h2>
      
      {concept.generatedImageBase64 && (
        <InfoSection title="AI Generated UI Preview" icon={<PhotoIcon />} defaultOpen={true}>
          <div className="mb-4 border border-slate-600 rounded-lg overflow-hidden shadow-md bg-slate-800">
            <img 
              src={`data:image/jpeg;base64,${concept.generatedImageBase64}`} 
              alt={`${title} UI Preview`} 
              className="w-full h-auto object-contain" 
            />
          </div>
          <p className="text-xs text-slate-400 italic mt-1">Note: This is an AI-generated visual concept and may require interpretation and refinement.</p>
        </InfoSection>
      )}

      <InfoSection title="Overall Description" icon={<PencilSquareIcon />}>
        <p>{concept.description}</p>
      </InfoSection>

      {concept.targetAudience && (
        <InfoSection title="Target Audience" icon={<UsersIcon />} defaultOpen={false}>
          <p>{concept.targetAudience}</p>
        </InfoSection>
      )}

      {concept.coreFunctionality && concept.coreFunctionality.length > 0 && (
        <InfoSection title="Core Functionalities" icon={<BoltIcon />} defaultOpen={false}>
          <TagList items={concept.coreFunctionality} />
        </InfoSection>
      )}
      
      <InfoSection title="Key Screens Design" icon={<ComputerDesktopIcon />} defaultOpen={true}>
        {concept.keyScreens.map((screen, index) => (
          <KeyScreenItemDisplay key={index} screen={screen} />
        ))}
      </InfoSection>

      {concept.mainUiComponents && concept.mainUiComponents.length > 0 && (
        <InfoSection title="Reusable UI Components" icon={<Square2StackIcon />} defaultOpen={false}>
          {concept.mainUiComponents.map((comp, index) => (
            <ReusableUiComponentDisplay key={index} component={comp} />
          ))}
        </InfoSection>
      )}
      
      <InfoSection title="Visual Style Guide" icon={<CubeTransparentIcon />} defaultOpen={true}>
        <VisualStyleGuideDisplay guide={concept.visualStyleGuide} />
      </InfoSection>


      {concept.figmaImplementationStrategy && concept.figmaImplementationStrategy.length > 0 && (
         <InfoSection title="Figma Implementation Strategy" icon={<LightBulbIcon />} defaultOpen={false}>
          <ul className="list-disc list-inside space-y-1 pl-1">
            {concept.figmaImplementationStrategy.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </InfoSection>
      )}
    </div>
  );
};

export const UiDisplay: React.FC<{ webUi: UiConcept | null; mobileUi: UiConcept | null; }> = ({ webUi, mobileUi }) => {
  if (!webUi && !mobileUi) {
    return null;
  }

  return (
    <div className="mt-8 opacity-0 animate-fadeInResults w-full">
      {webUi && <ConceptCard title="Web Application Design Specification" concept={webUi} />}
      {mobileUi && <ConceptCard title="Mobile Application Design Specification" concept={mobileUi} />}
    </div>
  );
};

