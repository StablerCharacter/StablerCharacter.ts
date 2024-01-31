import { Game, StoryManager, Chapter } from "./index.js";

new EventSource("/esbuild").addEventListener("change", () => location.reload());

new Game()
    .initialize()
    .addStoryScene({
        story: new StoryManager([
            async () => {
                const res = await fetch("./story/one.json");
                if (!res.ok) {
                    return;
                }
                return Chapter.fromTreeObject(await res.json());
            },
        ]),
    })
    .addEndCredits();
