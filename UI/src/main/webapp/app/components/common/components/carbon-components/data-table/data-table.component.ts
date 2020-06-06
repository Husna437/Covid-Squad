import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { DataTableV2, Pagination, Search } from "carbon-components";
import { Observable, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
    selector: "app-data-table",
    templateUrl: "data-table.component.html",
    styleUrls: ["data-table.component.less"]
})

export class DataTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() headers: any[];
    @Input() rows: any[];
    @Input() totalCount: any;
    @Input() isExpandable: boolean = false;
    @Input() enableSearchBox: boolean = false;
    @Input() optionsColumnIndex: number = -1;
    @Input() colClickIndex: number = null;
    @Input() batchActions: any[] = [];
    @Input() paginationControls: any = {};
    @Input() serverSideSearch = false;
    @Input() enablePrimaryButton: boolean = false;
    @Input() primaryButtonText: string;
    @Input() enableGhostButton: boolean = false;
    @Input() ghostButtonText: string;
    @Input() enableRefresh: boolean = false;
    @Input() refreshText: string;
    @Input() ghostButtonImage = "";
    @Input() primaryButtonImage = "";
    @Input() expandWithCheckbox = false;

    @Output() optionSelected: EventEmitter<any>;
    @Output() colClicked: EventEmitter<any>;
    @Output() fetchMoreData: EventEmitter<any>;
    @Output() searchText: EventEmitter<any>;
    @Output() primaryButtonClick: EventEmitter<any>;
    @Output() ghostButtonClick: EventEmitter<any>;
    @Output() refreshClick: EventEmitter<any>;
    @Output() batchAction: EventEmitter<any>;

    @ViewChild("cancelBatchAction") cancelBatchEle: ElementRef;

    filteredRows: any[] = [];
    private filteredRowsSubject: ReplaySubject<any[]>;
    filteredRows$: Observable<any[]>;

    itemsPerPage: number = 10;
    numberOfPages: number = 1;
    currentPage: number = 1;
    displayRange = {
        start: 0, end: 0
    };
   nestedSelectedItems = [];

    private tableInstance: any;

    constructor(private el: ElementRef) {
        this.optionSelected = new EventEmitter<any>();
        this.colClicked = new EventEmitter<any>();
        this.fetchMoreData = new EventEmitter<any>();
        this.searchText = new EventEmitter<any>();
        this.primaryButtonClick = new EventEmitter<any>();
        this.ghostButtonClick = new EventEmitter<any>();
        this.refreshClick = new EventEmitter<any>();
        this.batchAction = new EventEmitter<any>();
        this.filteredRowsSubject = new ReplaySubject<any[]>(1);
        this.filteredRows$ = this.filteredRowsSubject
        .pipe(
            tap((rows: any[]) => {
                rows.forEach(row => { row.isExpanded = false; });
                this.filteredRows = rows.slice();

                if (this.isExpandable && this.tableInstance) {
                    setTimeout(() => {
                        this.tableInstance.refreshRows();
                    });
                }
                if (this.paginationControls && this.paginationControls.currentPage) {
                    this.currentPage = this.paginationControls.currentPage;
                } else {
                    this.currentPage = 1;
                }               
                this.updateNumberOfPages();
                this.updateDisplayRange();
            })
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.rows && changes.rows.currentValue) {
            // set table content
            this.filteredRowsSubject.next(changes.rows.currentValue);
        }
        if (this.cancelBatchEle) {
            this.cancelBatchEle.nativeElement.click();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const dataTableElement = this.el.nativeElement.querySelector("[data-table-v2]");
        dataTableElement.addEventListener("data-table-v2-beforetogglesort", (event: any) => {
            const button = event.detail.element;
            const pivot = button.querySelector("span").textContent;
            const order = (!event.detail.previousValue || event.detail.previousValue === "descending") ? "ascending" : "descending";
            // console.log(`Sorting ${pivot} ${order}.`);

            this.filteredRowsSubject.next(this.sort(pivot, order));
        });
        this.tableInstance = DataTableV2.create(dataTableElement);

        const paginationElement = this.el.nativeElement.querySelector("[data-pagination]");
        paginationElement.addEventListener("pageChange", (event: any) => {
            if (this.cancelBatchEle) {
                this.cancelBatchEle.nativeElement.click();
            }    
            if (event.detail.direction === "forward" && this.currentPage < this.numberOfPages) {
                this.currentPage++;
            } else if (event.detail.direction === "backward" && this.currentPage > 1) {
                this.currentPage--;
            }
            this.updateDisplayRange();

            const pageNumberInput = this.el.nativeElement.querySelector("[data-page-number-input]");
            pageNumberInput.selectedIndex = this.currentPage - 1;
            if (this.paginationControls && this.paginationControls.pageSize) {
                this.checkServerPageFetch();
            }
            this.nestedSelectedItems = []; // Clear all nested selected items
        });
        paginationElement.addEventListener("pageNumber", (event: any) => {
            this.cancelBatchEle.nativeElement.click();
            this.nestedSelectedItems = []; // Clear all nested selected items
            this.currentPage = event.detail.value;
            this.updateDisplayRange();
            if (this.paginationControls && this.paginationControls.pageSize) {
                this.checkServerPageFetch();
            }
        });
        paginationElement.addEventListener("itemsPerPage", (event: any) => {
            this.itemsPerPage = event.detail.value;
            this.currentPage = 1; // reset table to page 1
            const pageNumberInput = this.el.nativeElement.querySelector("[data-page-number-input]");
            pageNumberInput.selectedIndex = this.currentPage - 1;
            this.updateNumberOfPages();
            this.updateDisplayRange();
            if (this.paginationControls && this.paginationControls.pageSize) {
                this.checkServerPageFetch();
            }
            if (this.cancelBatchEle) {
                this.cancelBatchEle.nativeElement.click();
                this.nestedSelectedItems = []; // Clear all nested selected items
            }  
        });
        Pagination.create(paginationElement);
    }

    ngOnDestroy() {
        this.tableInstance.release();
        // this.paginationInstance.release();
    }

    expandRow(row, elementid) {
        row.isExpanded = !row.isExpanded;
        if (this.expandWithCheckbox) {
            this.checkWithExpand(elementid, row, row.isExpanded);
        }
    }

    filter(text: string): any[] {
        return this.rows.filter(
            (row: any) => row.data.some((field: string) => field.toString().toLowerCase().indexOf(text.toLowerCase()) !== -1)
        );
    }

    sort(pivot: string, order: string): any[] {
        const k = order === "ascending" ? 1 : -1;
        let pivotIdx = -1;
            for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i].name === pivot) {
                pivotIdx = i;
                break;
            }
        }

        if (pivotIdx === -1) {
            throw new Error("Invalid table header.");
        }

        const mapped = this.filteredRows.map((el: any, i: number) => {
            return {index: i, value: el};
        });

        mapped.sort((a, b) => {
            if (a.value.data[pivotIdx] && a.value.data[pivotIdx].toLowerCase() >
                b.value.data[pivotIdx] && b.value.data[pivotIdx].toLowerCase()) {
                return k;
            }
            if (a.value.data[pivotIdx] && a.value.data[pivotIdx].toLowerCase() <
                b.value.data[pivotIdx] && b.value.data[pivotIdx].toLowerCase()) {
                return -1 * k;
            }
            return 0;
        });

        return mapped.map((el) => {
            return this.filteredRows[el.index];
        });
    }

    onSearchTextChanged(text: string) {
        let filteredRows = [];
        if (text.trim().length > 0) {
            filteredRows = this.filter(text);
        } else {
            filteredRows = this.rows.slice();
        }
        this.filteredRowsSubject.next(filteredRows);
    }

    onSearchTextSubmit(text: string) {
        this.searchText.emit({text: text});
    }

    onOptionsClick(action, rowIdx) {
        const rowOffset = (this.currentPage - 1) * this.itemsPerPage;
        this.optionSelected.emit({action: action, data: this.filteredRows[rowOffset + rowIdx]});
    }

    colClick(cellData) {
        this.colClicked.emit({id: cellData.metadata.id});
    }

    updateNumberOfPages() {
        this.numberOfPages = Math.trunc(this.filteredRows.length / this.itemsPerPage);
        if (this.filteredRows.length % this.itemsPerPage || this.numberOfPages === 0) {
            this.numberOfPages++;
        }
    }

    updateDisplayRange() {
        this.displayRange = {
            start: this.itemsPerPage * (this.currentPage - 1),
            end: this.itemsPerPage * this.currentPage >
                this.filteredRows.length ? this.filteredRows.length : this.itemsPerPage * this.currentPage
        };
    }

    checkServerPageFetch() {
        if (this.filteredRows.length <= this.itemsPerPage * this.currentPage || 
            this.filteredRows.length <= (this.itemsPerPage * this.currentPage) - 1) {
                this.fetchMoreData.emit({currentPage: this.currentPage});
        }
        // let noOfItems = this.itemsPerPage * this.currentPage
    }

    getNumberOfRows(): number {
        if (this.totalCount > 0) {
            return this.totalCount;
        } else {
            return this.filteredRows.length;
        }    
    }

    getPageNumbering(): number[] {
        let range: number[] = [];
        for (let i = 0; i < this.numberOfPages; i++) {
            range.push(i + 1);
        }
        return range;
    }
    
    onPrimaryClick($event) {
        this.primaryButtonClick.emit();
    }

    onGhostClick($event) {
        this.ghostButtonClick.emit();
    }

    onRefreshClick($event) {
        this.refreshClick.emit();
    }

    // Indetreminate state does not get cleared on clicking cancel, need to clear manually
    cancelBatchActionClick() { 
        if (this.nestedSelectedItems) {
            this.clearIndetermianteState();
            this.nestedSelectedItems = [];
        }
    }


    batchActionClick(action) {
        const rowOffset = (this.currentPage - 1) * this.itemsPerPage;
        let checkedBoxList = this.tableInstance.element.querySelectorAll(".bx--checkbox:checked");
        let selectedItems = [];
        if (!this.expandWithCheckbox) {
            for (let i = 0; i < checkedBoxList.length; i++) {
                let id = checkedBoxList[i].id;
                let index = parseInt(id.split("-")[3], 10);
                if (index !== 0) {
                    selectedItems.push(
                        this.filteredRows[rowOffset + (index - 1)].metadata.id);
                }
            }
            this.batchAction.emit({action: action, selectedItems: selectedItems});
        } else { // If checkbox and expand
            this.batchAction.emit({action: action, selectedItems: this.nestedSelectedItems});
        } 
        this.cancelBatchEle.nativeElement.click();
        // Indetreminate state does not get cleared on clicking Cancel
        if (this.nestedSelectedItems) { 
            this.clearIndetermianteState();
        }
    }

    handleAllCheckboxSelection($event) { // Assume all checkboxes are selected.
        if (this.expandWithCheckbox) {
            this.clearIndetermianteState(); // If there are indetreminate states clear them
            
            let rows = this.filteredRows.slice(this.displayRange.start, this.displayRange.end);
            this.nestedSelectedItems = []; // Clear all selected items
            if ($event.currentTarget.checked) { // If the granparent is checked
                for (let j = 0; j < rows.length; j++) {
                    let subItemsSet = new Set();
                    let subItemIndexSet = new Set();
                    for (let k = 0; k < rows[j].metadata.childData.length; k++) {
                        subItemsSet.add(rows[j].metadata.childData[k].id);
                        subItemIndexSet.add(k + 1);
                    }
                    this.nestedSelectedItems.push({ 
                        mainRow: rows[j].metadata.id,
                        subItems: subItemsSet,
                        subItemIndex: subItemIndexSet
                    });
                } 
            } else { // If granparent checkbox is unselected
                
            }
            this.updateNestedItemCount();
        }
    }

    clearIndetermianteState() {
        let allIndeterminate = document.querySelectorAll("input:indeterminate");
        for (let i = 0; i < allIndeterminate.length; i++) {
            let ele = allIndeterminate[i] as HTMLInputElement;
            ele.indeterminate = false;
          }
    }

    // If the items are expanded need to handle no of items selected.
    checkWithExpand(mainIndex, row, isExpanded) {
        const rowOffset = (this.currentPage - 1) * this.itemsPerPage;
        setTimeout(() => { // Need time to expand hence timeout
            if (isExpanded) { // If the row expands, previously checked nested items should be checked back
                let mainElementId = "bx--checkbox-" + mainIndex;
                let mainEle = document.querySelector(`[id*="` + mainElementId + `"]`) as HTMLInputElement;
                if (mainEle.checked || mainEle.indeterminate) { // Works for checked and indeterminate
                    let item = this.nestedSelectedItems.filter
                    (selectedItem => selectedItem.mainRow === this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id);
                    if (item && item.length > 0) {
                        let subItems = Array.from(item[0].subItems);
                        let subIndexes = Array.from(item[0].subItemIndex);
                        for (let i = 0; i < subItems.length; i++ ) {
                            let elementid = "bx--checkbox-" + mainIndex + "." + subIndexes[i];
                            let ele = document.querySelector(`[id*="` + elementid + `"]`) as HTMLInputElement;
                            ele.click();
                        }
                    }
                } else {
                }
            }
        });
    }

    handleParentCheckboxClick(mainIndex, metadata = null) {
        let elementid = "bx--checkbox-" + mainIndex;
        let ele = document.querySelector(`[id*="` + elementid + `"]`) as HTMLInputElement; 
        let checkboxListNew = document.querySelectorAll(`[id*="` + elementid + `."]`);
        const rowOffset = (this.currentPage - 1) * this.itemsPerPage;

        if (ele.checked) { // If parent element is checked
            if (checkboxListNew && checkboxListNew.length) { // If the child is expanded
                for (let i = 0; i < checkboxListNew.length; i++) { 
                    let subEle = checkboxListNew[i] as HTMLInputElement;
                    if (!subEle.checked) {
                        subEle.click();
                    }
                }
            } else { // If child elements are not visible, just add the items to the nested
                let item = this.nestedSelectedItems.filter
                (selectedItem => selectedItem.mainRow === this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id);
                if (!(item && item.length)) { // If item does not exist
                    let subItemsSet = new Set();
                    let subItemIndexSet = new Set();
                    
                    for (let i = 0; i < metadata.childData.length; i++) {
                        subItemsSet.add(metadata.childData[i].id);
                        subItemIndexSet.add(i + 1);
                    }
                    this.nestedSelectedItems.push({ 
                        mainRow: this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id,
                        subItems: subItemsSet,
                        subItemIndex: subItemIndexSet
                    });
                } else { // If item already exists
                    for (let i = 0; i < metadata.childData.length; i++) {	
                        item[0].subItems.add(metadata.childData[i].id);
                        item[0].subItemIndex.add(i + 1);
                    }
                }
            }
        } else { // If parent element is unchecked
            for (let i = 0; i < checkboxListNew.length; i++) { // Uncheck subsequent child items
                let subEle = checkboxListNew[i] as HTMLInputElement;
                if (subEle.checked) {
                    subEle.click();
                }
            }
            // Remove the item from the list
            this.nestedSelectedItems = this.nestedSelectedItems.filter
            (selectedItem => selectedItem.mainRow !== this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id);
        }
        this.updateNestedItemCount();
    }

    handleNestedCheckbox(mainIndex, subIndex, childData) { // Function call for every nested checkbox check/uncheck
        let elementid = "bx--checkbox-" + mainIndex + "." + subIndex;
        // Get the nested element selected
        let ele = document.querySelector(`[id*="` + elementid + `"]`) as HTMLInputElement; 
        const rowOffset = (this.currentPage - 1) * this.itemsPerPage;
        let mainEleId = "bx--checkbox-" + mainIndex;
        let mainEle = document.querySelector(`[id*="` + mainEleId + `"]`) as HTMLInputElement; 
        let item = this.nestedSelectedItems.filter
        (selectedItem => selectedItem.mainRow === this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id); 
        let subItemCount = 0;

        // If nested element is checked
        if (ele.checked) {
            if (item.length) { // If  nested element under the main element is selected
                item[0].subItems.add
                    (this.filteredRows[rowOffset + (mainIndex - 1)].metadata.childData[subIndex - 1].id); 
                item[0].subItemIndex.add(subIndex); 
                subItemCount = item[0].subItems.size;
            } else { // If any nested element under main element is being checked for the first time
                let subItemSet = new Set();
                let subItemIndexSet = new Set();
                
                this.nestedSelectedItems.push({ 
                    mainRow: this.filteredRows[rowOffset + (mainIndex - 1)].metadata.id,
                    subItems: subItemSet.add(this.filteredRows[rowOffset + (mainIndex - 1)].metadata.childData[subIndex - 1].id),
                    subItemIndex: subItemIndexSet.add(subIndex)
                });
                subItemCount = 1;
            }
        } else { // If nested element is unchecked remove the item from the selected item list
            if (item.length) {
                item[0].subItems.delete
                    (this.filteredRows[rowOffset + (mainIndex - 1)].metadata.childData[subIndex - 1].id); 
                item[0].subItemIndex.delete(subIndex);
            }
            subItemCount = item[0].subItems.size;
        }
        
        // If all subitems are unchecked, set the main item check to false
        if (subItemCount === 0) {
            if (mainEle.checked) {
                mainEle.click();
            } else if (mainEle.indeterminate) {
                mainEle.indeterminate = false;
            }
        } else if (subItemCount < (childData && childData.length)) {
            // If some subitems are checked, then set main item to indetreminat
            mainEle.indeterminate = true;
        } else if (subItemCount === (childData && childData.length)) {
            // If all subitems are checked, then set main element to chec
            if (!mainEle.checked) {
                mainEle.click();
            } else if (mainEle.indeterminate) {
                mainEle.indeterminate = false;
            }
        }
        this.updateNestedItemCount();
    }

    // Update count on batch action bar (If nested items, total will be total subitems items selected)
    updateNestedItemCount() {
        let count = 0;
        for (let i = 0; i < this.nestedSelectedItems.length; i++ ) {	
            if (this.nestedSelectedItems[i].subItems) {
                count += this.nestedSelectedItems[i].subItems.size;
            }
        }
        this.tableInstance.countEl.innerText = count;
    }
}
