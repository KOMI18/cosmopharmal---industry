export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    message?: string
    errors?: Record<string, string>
  }
  
  export interface ApiError {
    status: number
    message: string
    code?: string
    details?: unknown
  }
