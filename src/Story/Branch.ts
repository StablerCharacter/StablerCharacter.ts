import Dialog from "./Dialog";

// type JsonifiedDialog = string | { [key: string]: string };

export default class Branch {
    dialogs: Dialog[];
    dialogIndex: number = 0;

    constructor(dialogs: Dialog[] = []) {
        this.dialogs = dialogs;
    }

    get currentDialog() {
        return this.dialogs[this.dialogIndex];
    }

    /// Increment the dialog index and returns the new dialog.
    nextDialog(): Dialog {
        return this.dialogs[++this.dialogIndex];
    }

    add(dialog: Dialog) {
        this.dialogs.push(dialog);
        return this;
    }

    static fromStringArray(array: string[]) {
        return new Branch(array.map((msg) => new Dialog(msg)));
    }
}
