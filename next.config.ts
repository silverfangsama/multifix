import type { NextConfig } from "next";
import JavaScriptObfuscator from 'webpack-obfuscator';
import type { Configuration } from 'webpack';


const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  webpack: (config: Configuration, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Only apply obfuscation to client-side production builds
    if (!dev && !isServer) {
      config.plugins = config.plugins || [];
      
      // Add JavaScript obfuscator plugin
      config.plugins.push(
        new JavaScriptObfuscator({
          // Basic obfuscation settings (good balance of security vs performance)
          compact: true,                    // Remove whitespace
          controlFlowFlattening: true,      // Transform code structure
          stringArray: true,                // Replace strings with encoded array
          rotateStringArray: true,          // Rotate the string array
          stringArrayThreshold: 0.75,       // 75% of strings will be obfuscated
          identifierNamesGenerator: 'hexadecimal', // Use hex names for variables
          transformObjectKeys: true,        // Transform object keys
          selfDefending: true,              // Add protection against code formatting
          disableConsoleOutput: true,       // Remove console.* calls
          
          // Performance settings (don't make it too heavy)
          controlFlowFlatteningThreshold: 0.5,
          splitStrings: true,
          splitStringsChunkLength: 10,
          
          // Disable heavy features that might break your app
          deadCodeInjection: false,         // Don't inject dead code (can break React)
          debugProtection: false,           // Don't add debug protection (can cause issues)
          unicodeEscapeSequence: false,     // Keep readable Unicode
        }, [])
      );
    }
    
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
