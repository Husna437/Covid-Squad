export const setupKeyboardEvent = (type: string, key: string = "", keyCode: number, shiftKey?: boolean, altKey?: boolean): Event => {
    let event;
    try {
    // Chrome, Safari, Firefox
        event = new KeyboardEvent(type, { key, shiftKey: shiftKey || false, altKey: altKey || false });
    } catch (e) {
        // PhantomJS, (IE 9+ ?)
        event = document.createEvent("CustomEvent");
        event.key = key;
        event.keyCode = keyCode;
        event.shiftKey = shiftKey || false;
        event.altKey = altKey || false;
        event.initEvent(type, true, false);
    }
    return event;
};
