import Branch from "./Branch";
import Dialog from "./Dialog";

export default class Chapter {
    branches: { [key: string]: Branch };
    branchKey: string = "main";

    constructor(branches: { [key: string]: Branch } = {}) {
        this.branches = branches;
    }

    get currentBranch(): Branch {
        return this.branches[this.branchKey];
    }

    add(name: string, branch: Branch) {
        this.branches[name] = branch;
        return this;
    }

    getTree(): object {
        const simplifiedBranches: { [key: string]: Dialog[] } = {};

        for (const key in this.branches) {
            simplifiedBranches[key] = this.branches[key].dialogs;
        }

        return simplifiedBranches;
    }

    /// Creates an instance of the Chapter class from an object which
    /// follows a specific pattern.
    static fromTreeObject(obj: { [key: string]: string[] }) {
        const chapter = new Chapter();

        for (const key in obj) {
            chapter.add(key, Branch.fromStringArray(obj[key]));
        }

        return chapter;
    }
}
