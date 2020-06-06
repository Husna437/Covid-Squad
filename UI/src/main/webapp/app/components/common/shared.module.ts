import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    AppPanelComponent,
    ConfirmationModalComponent,
    DataTableComponent,
    EditorComponent,
    FullPageLoadingIndicatorComponent,
    InputWithTagsComponent,
    ModalComponent,
    ModalContentComponent,
    NotificationsComponent,
    OptionsMenuComponent,
    ProgressBarComponent,
    SearchBoxComponent,
    SelectComponent,
    SvgIconComponent,
    TabComponent,
    ToolTipComponent,
    MultiSelectComponent,
    SafeHtmlPipe
} from "@cs/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        AppPanelComponent,
        ConfirmationModalComponent,
        DataTableComponent,
        EditorComponent,
        FullPageLoadingIndicatorComponent,
        InputWithTagsComponent,
        ModalComponent,
        ModalContentComponent,
        NotificationsComponent,
        OptionsMenuComponent,
        ProgressBarComponent,
        SearchBoxComponent,
        SelectComponent,
        SvgIconComponent,
        TabComponent,
        ToolTipComponent,
        MultiSelectComponent,
        SafeHtmlPipe
    ],
    exports: [
        AppPanelComponent,
        CommonModule,
        ConfirmationModalComponent,
        DataTableComponent,
        EditorComponent,
        FullPageLoadingIndicatorComponent,
        FormsModule,
        InputWithTagsComponent,
        ModalComponent,
        ModalContentComponent,
        NotificationsComponent,
        OptionsMenuComponent,
        ProgressBarComponent,
        ReactiveFormsModule,
        SearchBoxComponent,
        SelectComponent,
        MultiSelectComponent,
        SvgIconComponent,
        TabComponent,
        ToolTipComponent,
        TranslateModule,
        SafeHtmlPipe 
    ]
})

export class SharedModule {}
