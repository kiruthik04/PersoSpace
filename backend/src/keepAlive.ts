const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

export const startKeepAlive = () => {
  // Render automatically provides RENDER_EXTERNAL_URL in production
  const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;
  
  console.log(`Starting 14-minute keep-alive ping for: ${url}/health`);

  setInterval(async () => {
    try {
      const response = await fetch(`${url}/health`);
      if (response.ok) {
        console.log(`[Keep-Alive] Successfully pinged ${url}/health at ${new Date().toISOString()}`);
      } else {
        console.log(`[Keep-Alive] Ping received non-200 status: ${response.status}`);
      }
    } catch (error: any) {
      console.error(`[Keep-Alive] Ping failed: ${error.message}`);
    }
  }, PING_INTERVAL);
};
