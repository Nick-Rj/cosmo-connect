import ajconfig from '../arcjet/arcjet.config.js';
import { isSpoofedBot } from '@arcjet/inspect';

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await ajconfig.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ success: false, message: 'Rate limit exceeded. Please try again later.' });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ success: false, message: 'Bot access denied!' });
      } else {
        return res
          .status(403)
          .json({ success: false, message: 'Access denied by security policy!' });
      }
    }

    // Checking for spoofed bots: Bots acting as humans
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        success: false,
        error: 'Spoofed bot detected!',
        message: 'Malicious bot activity detected!',
      });
    }
    next();
  } catch (error) {
    console.log('Arcjet Protection Error:', error);
    return res.status(503).json({ success: false, message: 'Security service unavailable!' });
  }
};
