import { describe, it, expect } from 'vitest';
import { askGemini } from './gemini';

describe('Gemini Service', () => {
  it('should return football rules when asked', async () => {
    const response = await askGemini('how to play football');
    expect(response).toContain('Football (Soccer) is played');
  });

  it('should return stadium info for Dall\'Ara', async () => {
    const response = await askGemini('tell me about dall\'ara');
    expect(response).toContain('Stadio Renato Dall\'Ara');
  });

  it('should return navigation commands', async () => {
    const response = await askGemini('go to home');
    expect(response).toContain('NAVIGATE_HOME');
  });

  it('should return itinerary command', async () => {
    const response = await askGemini('generate itinerary');
    expect(response).toContain('COMMAND_GENERATE_ITINERARY');
  });

  it('should have a default response', async () => {
    const response = await askGemini('random query');
    expect(response).toContain('ArenaMind AI');
  });
});
