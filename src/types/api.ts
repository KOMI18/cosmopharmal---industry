export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    errors?: Record<string, string[]>
  }
  
  export interface ApiError {
    status: number
    message: string
    code?: string
    details?: any
  }