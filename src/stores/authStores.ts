import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState , LoginCredentials ,  Admin } from '@/types/auth';
import { ApiResponse } from '@/types/api';


// Store avec persistance
const login = async (
  data: LoginCredentials
): Promise<ApiResponse<Admin | null>> => {
  const response = await fetch('/api/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // ✅ data au lieu de credentials
  });
  if (!response.ok) {
    return {
      success: false,
      message: `Error ${response.status}`,
      data: null,
    };
  }

  // ✅ on parse la réponse JSON
  const result: ApiResponse<Admin | null> = await response.json();
  return result;
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // État initial
      admin: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Action de connexion
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response =  await login(credentials);

         

          if (response.success === false) {
            set({ 
              error: response.message || 'Erreur de connexion',
              isLoading: false 
            });
            return false;
          }
            console.log("LOG DANS LE STORE :" , response.data);
            
          set({
            admin: response.data ,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return true;
        } catch (error) {
          set({
            error: 'Erreur de connexion au serveur',
            isLoading: false
          });
          return false;
        }
      },

      // Action de déconnexion
      logout: () => {
        set({
          admin: null,
          isAuthenticated: false,
          error: null
        });
      },

      // Effacer les erreurs
      clearError: () => {
        set({ error: null });
      },

      // Définir admin manuellement
      setAdmin: (admin: Admin) => {
        set({
          admin,
          isAuthenticated: true,
          error: null
        });
      },

      // Vérifier le statut d'authentification
      checkAuthStatus: () => {
        const { admin, isAuthenticated } = get();
        return !!(admin && isAuthenticated);
      }
    }),
    {
      name: 'admin-auth-storage', // Nom de la clé localStorage
      storage: createJSONStorage(() => localStorage),
      
      // Choisir quelles propriétés persister
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated
      }),
      
      // Version du store (pour les migrations)
      version: 1,
      
      // Fonction de migration si nécessaire
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Partial<AuthState>;

        if (version < 1) {
          // Migration logic
          return {
            ...state,
            admin: state.admin ?? undefined,
            isAuthenticated: state.isAuthenticated ?? false
           
          } as AuthState;
        }
      
      }
   }
  )
);

// Selectors pour optimiser les re-renders
export const useAdmin = () => useAuthStore((state) => state.admin);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// Actions exportées
export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  logout: state.logout,
  clearError: state.clearError,
  setAdmin: state.setAdmin,
  checkAuthStatus: state.checkAuthStatus
}));