import Chapter from "./Chapter";

export type LazyChapter = () =>
    | Chapter
    | undefined
    | Promise<Chapter | undefined>;

export default class StoryManager {
    /// The chapters in the story. Can optionally be a function,
    /// allowing you to do some lazy loading.
    chapters: Array<Chapter | LazyChapter>;
    chapterIndex: number = 0;

    constructor(chapters: Array<Chapter | LazyChapter> = []) {
        this.chapters = chapters;
    }

    static async handleLazyChapter(chapter: LazyChapter) {
        let retVal = chapter();
        if (retVal instanceof Promise) {
            retVal = await retVal;
        }
        if (retVal === undefined) {
            throw Error(`Failed to wake up a lazy chapter.`);
        }
        return retVal;
    }

    async currentChapter(): Promise<Chapter> {
        const chapter = (): Chapter | LazyChapter =>
            this.chapters[this.chapterIndex];

        if (typeof chapter() === "function") {
            console.log(`Loading chapter ${this.chapterIndex}...`);
            this.chapters[this.chapterIndex] =
                await StoryManager.handleLazyChapter(chapter() as LazyChapter);
        }

        return chapter() as Chapter;
    }

    async currentBranch() {
        return (await this.currentChapter()).currentBranch;
    }

    async currentDialog() {
        return (await this.currentBranch()).currentDialog;
    }

    async nextDialog() {
        return (await this.currentBranch()).nextDialog();
    }

    add(chapter: Chapter) {
        this.chapters.push(chapter);
    }

    /// Represents the class as a cleaned up object for easier debugging.
    async getTree(): Promise<object> {
        return Promise.all(
            this.chapters.map(async (chapter) => {
                if (typeof chapter === "function") {
                    return await StoryManager.handleLazyChapter(chapter);
                }
                return new Promise<Chapter>((resolve) => resolve(chapter));
            })
        );
    }
}
