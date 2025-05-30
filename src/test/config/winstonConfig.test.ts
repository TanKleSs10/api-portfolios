import { WinstonLogger } from '../../config/winstonConfig';
import { Logger } from 'winston';

describe('WinstonLogger', () => {
  const mockInfo = jest.fn();
  const mockWarn = jest.fn();
  const mockError = jest.fn();
  const mockDebug = jest.fn();

  const mockLogger = {
    info: mockInfo,
    warn: mockWarn,
    error: mockError,
    debug: mockDebug,
  } as unknown as Logger;

  let logger: WinstonLogger;

  beforeEach(() => {
    // Limpiar llamadas antes de cada test
    jest.clearAllMocks();
    logger = new WinstonLogger(mockLogger);
  });

  it('should call logger.info with normalized context and default layer', () => {
    logger.info('hello', { user: 'diego' });
    expect(mockInfo).toHaveBeenCalledWith('hello', { user: 'diego', layer: 'default' });
  });

  it('should call logger.warn with layer and error context', () => {
    const err = new Error('warn-err');
    logger.warn('warn-msg', err, 'api');
    expect(mockWarn).toHaveBeenCalledWith('warn-msg', {
      message: 'warn-err',
      stack: err.stack,
      layer: 'api',
    });
  });

  it('should call logger.error with context.error inside', () => {
    const nestedError = new Error('nested boom');
    const context = { action: 'login', error: nestedError };
    logger.error('login failed', context, 'auth');
    expect(mockError).toHaveBeenCalledWith('login failed', {
      action: 'login',
      errorMessage: nestedError.message,
      errorStack: nestedError.stack,
      layer: 'auth',
    });
  });

  it('should call logger.debug with custom layer', () => {
    logger.debug('debugging', { a: 1 }, 'services');
    expect(mockDebug).toHaveBeenCalledWith('debugging', { a: 1, layer: 'services' });
  });

  it('should call logger methods without context', () => {
    logger.info('no context');
    expect(mockInfo).toHaveBeenCalledWith('no context', { layer: 'default' });
  });
});
