export const toggleInertElements = ( 
        visible: boolean, 
        elem: HTMLElement | Element, 
        excluded?: HTMLElement | Element | (HTMLElement | Element)[] 
    ) => {
        const appRootElement = document.querySelector("app-root");
        let currentElement = elem;
        let parentElement = currentElement.parentElement;
        while (parentElement && parentElement !== appRootElement ) {
            Array.from(parentElement.children).filter(childElement => 
                childElement !== currentElement).forEach((childElement: HTMLElement) => {
            if ( childElement === excluded || (Array.isArray(excluded) && 
                (excluded as HTMLElement[]).includes(childElement)) ) {
                return;
            }
            if (visible) {
                childElement.setAttribute("inert", "true");
            } else {
                childElement.removeAttribute("inert");
            }
            });
            currentElement = parentElement;
            parentElement = parentElement.parentElement;
        }
};
