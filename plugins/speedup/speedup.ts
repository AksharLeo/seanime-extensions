function init() {
    $ui.register((ctx) => {
        let isSpeeding = false;
        
        ctx.dom.onReady(async () => {
            const body = await ctx.dom.queryOne("body");
            if (!body) return;

            body.addEventListener("keydown", async (e: any) => {
                // Read from native plugin settings
                let targetKey = $getUserPreference("speedKey");
                if (!targetKey) targetKey = "c";
                
                // Compare case-insensitively
                if (e.key.toLowerCase() === targetKey.toLowerCase() && !isSpeeding) { 
                    isSpeeding = true;
                    
                    // HTML5 Web Player
                    const video = await ctx.dom.queryOne("video");
                    if (video) {
                        video.setProperty("playbackRate", 2.0);
                        ctx.videoCore.showMessage("Speed: 2x", 1000);
                    }
                }
            });

            body.addEventListener("keyup", async (e: any) => {
                let targetKey = $getUserPreference("speedKey");
                if (!targetKey) targetKey = "c";
                
                if (e.key.toLowerCase() === targetKey.toLowerCase()) {
                    isSpeeding = false;
                    
                    // HTML5 Web Player
                    const video = await ctx.dom.queryOne("video");
                    if (video) {
                        video.setProperty("playbackRate", 1.0);
                        ctx.videoCore.showMessage("Speed: 1x", 1000);
                    }
                }
            });
        });
    });
}
