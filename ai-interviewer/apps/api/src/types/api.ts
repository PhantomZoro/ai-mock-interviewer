export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  stack?: string; // Only populated in development
}

export interface HealthData {
  status: 'ok' | 'error';
  timestamp: string;
  environment: string;
}
