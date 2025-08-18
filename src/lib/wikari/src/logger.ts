class Logger {
  private environment: string;
  private format: string;
  private levels = ['error', 'warn', 'info', 'debug'] as const;
  private debug_wikari: boolean

  constructor(options?: { env?: string; format: string }) {
    this.environment = options?.env || process.env.NODE_ENV || 'development';
    this.format = options?.format || 'text'
    this.debug_wikari = process.env.DEBUG_WIKARI === 'true' || false
    if (this.debug_wikari) console.log(`[WIKARI] debug wikari on`)
  }

  private log(level: 'error' | 'warn' | 'info' | 'debug', ...args: any[]): void {
    if (!this.debug_wikari) return
    const timestamp = new Date()
      .toISOString()
      .replace(
        /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}\.\d{3})Z$/,
        '$1 $2'
      )
    console.log(`[${timestamp}] [${level}] [WIKARI]`, ...args)
  }

  info(...args: any[]): void {
    this.log('info', ...args);
  }

  warn(...args: any[]): void {
    this.log('warn', ...args);
  }

  error(...args: any[]): void {
    this.log('error', ...args);
  }

  debug(...args: any[]): void {
    this.log('debug', ...args);
  }
}



export default new Logger()