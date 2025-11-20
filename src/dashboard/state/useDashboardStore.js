import { create } from 'zustand';
import { initialModuleEntries, moduleSections } from '../data/moduleRegistry';

const defaultTheme = {
  colors: {
    primary: '#a90f35',
    secondary: '#111827',
    accent: '#f97316',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
  typography: {
    fontFamily: '"Inter", "DM Sans", sans-serif',
    baseSize: 16,
    radius: 16,
  },
};

const sampleInstitutes = [
  {
    id: 'destination-ias',
    name: 'Destination IAS',
    status: 'Live',
    leadsThisWeek: 42,
    owner: 'Garv',
  },
  {
    id: 'dsl-english',
    name: 'DSL English',
    status: 'Draft',
    leadsThisWeek: 18,
    owner: 'Aditi',
  },
];

const sampleLeads = [
  { name: 'Ananya Singh', route: '/institutes/destination-ias', source: 'Hero form', status: 'New' },
  { name: 'Rahul Patel', route: '/students', source: 'CTA click', status: 'Contacted' },
  { name: 'Meera Sharma', route: '/publications', source: 'Download deck', status: 'Won' },
];

export const useDashboardStore = create((set, get) => ({
  moduleSections,
  modules: initialModuleEntries,
  activeModuleId: moduleSections[0]?.modules[0]?.id || null,
  activeSectionId: moduleSections[0]?.id || null,
  audience: 'home',
  preview: { breakpoint: 'desktop', theme: 'light' },
  theme: defaultTheme,
  institutes: sampleInstitutes,
  leads: sampleLeads,

  selectSection: (sectionId) => set({ activeSectionId: sectionId }),
  selectModule: (moduleId, sectionId) =>
    set({
      activeModuleId: moduleId,
      activeSectionId: sectionId || get().activeSectionId,
      audience: moduleSections
        .flatMap((section) => section.modules)
        .find((mod) => mod.id === moduleId)?.audience || get().audience,
    }),
  updateModuleData: (moduleId, data) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [moduleId]: {
          ...state.modules[moduleId],
          data,
          updatedAt: new Date().toISOString(),
          status: 'draft',
        },
      },
    })),
  publishModule: (moduleId) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [moduleId]: {
          ...state.modules[moduleId],
          status: 'published',
        },
      },
    })),
  setAudience: (audience) => set({ audience }),
  setPreviewOption: (key, value) =>
    set((state) => ({
      preview: {
        ...state.preview,
        [key]: value,
      },
    })),
  updateTheme: (payload) =>
    set((state) => ({
      theme: {
        ...state.theme,
        ...payload,
      },
    })),
  upsertInstitute: (institute) =>
    set((state) => {
      const exists = state.institutes.some((item) => item.id === institute.id);
      return {
        institutes: exists
          ? state.institutes.map((item) => (item.id === institute.id ? { ...item, ...institute } : item))
          : [...state.institutes, institute],
      };
    }),
  addLead: (lead) =>
    set((state) => ({
      leads: [{ ...lead, status: lead.status || 'New' }, ...state.leads],
    })),
}));

