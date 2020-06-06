import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, AfterViewInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as Quill from "quill";

@Component({
    selector: "app-editor",
    templateUrl: "editor.component.html",
    styleUrls: ["editor.component.less"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditorComponent),
        multi: true
    }]
})
export class EditorComponent implements ControlValueAccessor, AfterViewInit {
    @Input() enableSave: boolean = true;
    @Input() enableCancel: boolean = true;
    @Input() editorType: string = "";
    @Input() placeholderEditor = "Add content";
    @Input() isMccsRequired = true;
    @Output() resetEditorState: EventEmitter<any> = new EventEmitter();
    private editor;    
    private valueToReturn = "";  
    private selectedTextObj = {};

    public quill: any;

    @ViewChild("domEditor", {read: ElementRef}) domEditor: ElementRef;
    input: string;
    tags: any[] = [];
    onModelChange: any = () => {};
    onModelTouched: any = () => {};

    @HostListener("click") onHostClick() {
        if (this.domEditor) {
            this.domEditor.nativeElement.focus();
        }
    }

    constructor() {}

    ngAfterViewInit() {
        // Create custom blots
        let inline = Quill.import("blots/inline");
        let parchment = Quill.import("parchment");
        let cursorBlot = parchment.query("cursor");
        cursorBlot.CONTENTS =  " "; // Set cursor to empty as BOM is inserted

        // Create MCCS blots
        class MCCSBlot extends inline { }
        MCCSBlot["blotName"] = "mccs";
        MCCSBlot["tagName"] = "mccs-input";
        Quill.register(MCCSBlot);

        // Create empty connect agent tag
        let embed = Quill.import("blots/embed");
        class QuillAgentTag extends embed {
            static create() {
                let value = " ";
                let node = super.create(value);
                return node;
            }
            // Update innerHTML to empty when text is copied to editor
            constructor(domNode, value) {
                super(domNode);
                domNode.innerHTML = " ";
            }
        }

        QuillAgentTag["blotName"] = "connectAgent"; 
        QuillAgentTag["tagName"] = "connect-agent";
        Quill.register(QuillAgentTag);

        // Add icons for H3 and H4
        let icons = Quill.import("ui/icons");
        icons.bold = "<b style='padding-right: 10px;'>B</b>";
        icons.italic = "<b style='padding-right: 10px; font-style: italic;'>I</b>";
        icons.underline = "<b style='padding-right: 10px; text-decoration: underline;'>U</b>";
        // tslint:disable-next-line:max-line-length
        icons.list = "<svg width='16' height='10' viewBox='0 0 16 10'><path d='M6 9V8h10v1zm0-7V1h10v1z'></path><path d='M0 1.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 1 1-3 0M0 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 1 1-3 0'></path></svg>";
        // tslint:disable-next-line:max-line-length
        icons.link = "<svg width='16' height='13' viewBox='0 0 16 13'><path d='M9.3 7.1l-.7-.7c.1-.1.2-.2.6-.5.9-.8.9-2.2.1-3l-.1-.1c-.8-.8-2.3-.8-3.1.1L1.6 7.3c-.9.9-.9 2.3 0 3.1l.2.2c.8.8 2 .8 2.8.1l.7.7c-1.2 1.1-3 1-4.2-.1l-.2-.2C-.3 9.9-.3 7.8.9 6.6l4.4-4.4C6.6.9 8.6.9 9.9 2.2l.1.1c1.2 1.3 1.1 3.2-.1 4.4-.3.2-.5.4-.6.4z'></path><path d='M6.8 4.7l.7.7-.7.7c-.9.9-.9 2.3 0 3.2.9.9 2.3.9 3.1 0l4.5-4.5c.9-.9.9-2.3 0-3.1l-.1-.1c-.7-.7-1.9-.7-2.7 0l-.1.1-.8-.7.1-.1c1.1-1.1 3-1.1 4.1 0l.2.1c1.2 1.2 1.2 3.3 0 4.5L10.6 10c-1.2 1.2-3.3 1.2-4.5 0-1.3-1.3-1.3-3.3 0-4.5l.7-.8z'></path></svg>";
        this.quill = new Quill("#csquill" + this.editorType, { // Initialize editor
            modules: {
                toolbar: "#quillToolbar" + this.editorType
            },
            placeholder: this.placeholderEditor,
            bounds: ".editor-container",
            theme: "snow"
        });

        if (document.querySelector("#quillmccs" + this.editorType)) {
            // Format content as MCCS
            document.querySelector("#quillmccs" + this.editorType).addEventListener("click", ($event) => { 
                this.formatContent("mccs", $event);
            }); 
        } 

        if (document.querySelector("#connectAgent" + this.editorType)) {
            // Format content as Agent
            document.querySelector("#connectAgent" + this.editorType).addEventListener("click", ($event) => {
                let range = this.quill.getSelection();
                if (range) {
                    this.quill.insertEmbed(range.index, "connectAgent", ""); // Insert tag
                    this.quill.container.getElementsByTagName("connect-agent")[0].innerHTML = " ";                
                    this.quill.setSelection(range.index + 1, 2); // Set cursor
                }
            }); 
        }

        if (this.valueToReturn && this.valueToReturn.length > 0) {
            this.quill.clipboard.dangerouslyPasteHTML(0, this.valueToReturn); // Copy value to editor
        }

        if (!this.enableSave) {
            this.quill.on("text-change", (delta, oldDelta, source) => {
                let html = this.quill.container.children[0].innerHTML;
                // html = html.replace(/<p><br><\/p>/g, ""); // Trim extra enter keys
                let decodedHTML = this.decodeHTMLEntities(html);
                decodedHTML = this.replaceFirstOccurenceInString(decodedHTML, "<p>", "");
                decodedHTML = this.replaceFirstOccurenceInString(decodedHTML, "</p>", "");
                decodedHTML = decodedHTML.trim();
                this.onModelChange(decodedHTML);
            });
        }
    }

    formatContent(formattag, event) { // Format/unformat custom tags
        let selection = this.quill.selection.getRange();
        let indexToStart;
        let format;
        if (selection[0] && selection[0].length === 0) {
            format = this.quill.getFormat(selection[0].index);
            indexToStart = selection[0].index - 1;
        } else {
            format = this.quill.getFormat(selection[0].index + 1);
            indexToStart = selection[0].index;
        }     

        if (format[formattag]) {          
            this.quill.removeFormat(indexToStart, selection[0].index + selection[0].length); // Clear format
            if (event.currentTarget.classList.contains("ql-active")) { // Remove active class
                event.currentTarget.classList.remove("ql-active");
            }
        } else {  
            if (!event.currentTarget.classList.contains("ql-active")) {
                event.currentTarget.classList.add("ql-active"); // Add active class
            }
            this.quill.format(formattag, true); // Add format
        }       
    }
 

    // Save data
    saveData() { 
        let html = this.quill.container.children[0].innerHTML;
        // html = html.replace(/<p><br><\/p>/g, ""); // Trim extra enter keys
        let decodedHTML = this.decodeHTMLEntities(html);
        decodedHTML = this.replaceFirstOccurenceInString(decodedHTML, "<p>", "");
        decodedHTML = this.replaceFirstOccurenceInString(decodedHTML, "</p>", "");

        this.onModelChange(decodedHTML);
        this.resetEditorState.emit();
    }

    // Cancel save
    onCancel($event) {
        this.resetEditorState.emit();
    } 
    // From ControlValueAccessor interface
    writeValue(valueToReturn: any) {
        this.valueToReturn = valueToReturn;
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onModelChange = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onModelTouched = fn;
    }

    decodeHTMLEntities(text) { // Decode html content
        let entities = [
            ["amp", "&"],
            ["apos", "\""],
            ["#x27", "\""],
            ["#x2F", "/"],
            ["#39", "\""],
            ["#47", "/"],
            ["lt", "<"],
            ["gt", ">"],
            ["nbsp", " "],
            // tslint:disable-next-line:quotemark
            ["quot", '"']
        ];

        for (let i = 0, max = entities.length; i < max; ++i) {
            text = text.replace(new RegExp("&" + entities[i][0] + ";", "g"), entities[i][1]);
        }
        return text;
    }

    replaceFirstOccurenceInString(stringToReplace, oldWord, newWord) { // Replace first occurence
        return stringToReplace.replace(oldWord, newWord);
    }
}
