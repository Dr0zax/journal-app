import { setHeaderFooter, setEntry } from "./utils.mjs";
import { setupSettingsMenu } from "./settings-menu.mjs";

function format(command) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const contents = range.cloneContents();
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(contents);

    const isBold = tempDiv.querySelector("strong") || tempDiv.querySelector("b");
    const isItalics = tempDiv.querySelector("i");
    const isUnderlined = tempDiv.querySelector("u");

    switch (command) {
        case 'bold':
            if (isBold) {
                removeFormat(range, "b")
            } else {
                applyFormat(range, "b")
            }
            break;
        case 'italics':
            if (isItalics) {
                removeFormat(range, "i")
            } else {
                applyFormat(range, "i")
            }
            break;
        case 'underline':
            if (isUnderlined) {
                removeFormat(range, "u")
            } else {
                applyFormat(range, "u")
            }
            break
        default:
            break;
    }
}

function applyFormat(range, tagName) {
    const wrapper = document.createElement(tagName);
    wrapper.appendChild(range.extractContents());
    range.insertNode(wrapper);

    const selection = window.getSelection();
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    newRange.collapse(false);
    selection.addRange(newRange);
}

function removeFormat(range, tagName) {
    const fragment = range.extractContents();
    const cleaned = removeTags(fragment, tagName);
    range.insertNode(cleaned);

    const selection = window.getSelection();
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(cleaned);
    newRange.collapse(false);
    selection.addRange(newRange);
}

function removeTags(node, tagName) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    let current;
    while (current = walker.nextNode()) {
        if (current.tagName.toLowerCase() === tagName.toLowerCase()) {
            const parent = current.parentNode;
            while (current.firstChild) {
                parent.insertBefore(current.firstChild, current);
            }
            parent.removeChild(current);
        }
    }
    return node;
}

const buttons = document.querySelectorAll(".editor-function")

buttons.forEach(button => button.addEventListener("click", () => {
    if (button.id == "createEntry") {
        let editorContent = document.querySelector("#editor").innerHTML;
        setEntry(editorContent);
    }
    else {
        format(button.id);
    }
}))

setHeaderFooter();
setupSettingsMenu();