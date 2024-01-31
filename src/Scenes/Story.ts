import type { Types as PTypes } from "phaser";
import StoryManager from "../Story/StoryManager";
import Chapter from "../Story/Chapter";
import Branch from "../Story/Branch";
import Dialog from "../Story/Dialog";
import Scene from "./Scene";

export interface StoryConfig {
    dialogConfig?: PTypes.GameObjects.Text.TextStyle;
    story: StoryManager;
}

export class Story extends Scene {
    config: StoryConfig;

    constructor(
        config: StoryConfig = {
            story: new StoryManager([
                new Chapter({
                    main: new Branch([new Dialog("Hello, world!")]),
                }),
            ]),
        }
    ) {
        super();
        this.config = config;
    }

    create() {
        this.add.text(100, 100, "Hello, world!", this.config.dialogConfig);
    }
}
