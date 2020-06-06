import { Component, OnInit, ComponentFactoryResolver, Injector, OnDestroy} from "@angular/core";
import { UtilService, FullPageLoadingIndicatorService, ModalService, NotificationsService } from "@cs/components/common";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { RationDetailsService } from "@cs/main/home/ration-details/ration-details.service";

@Component({
    selector: "app-ration-details",
    templateUrl: "./ration-details.component.html",
    styleUrls: ["./ration-details.component.less"],
    providers: [RationDetailsService]
})
export class RationDetailsComponent implements OnInit, OnDestroy {

    headers: any[] = [];
    rows: any[] = [];
    states = [];
    districts = [];
    circle = [];

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private utilService: UtilService,
        private translate: TranslateService,
        private notificationsService: NotificationsService,
        private modalService: ModalService,
        private fpli: FullPageLoadingIndicatorService
        ) { }

    ngOnInit() {
        this.fpli.conceal();
        this.states = ["Karnataka"];
        this.districts = ["Bangalore"];
        this.circle = ["Yelhanka", "Nagavara", "KalyanNagar", "RTNagar", "KRPuram"];
        this.headers = [
            {name: "Consumer Name", width: "12%"},
            {name: "Ration Card Number", width: "15%"},
            {name: "Category", width: "8%"},
            {name: "Age", width: "5%"},
            {name: "Sex", width: "5%"},
            {name: "Contact Number", width: "10%"},
            {name: "Address", width: "10%"},
            {name: "Ration Amount", width: "10%"},
            {name: "Price", width: "5%"},
            {name: "Status Delivered/Not Delivered", width: "20%"}
        ];
    }

    getRationDetails() {
        let data = [{
            "consumername": "Ramesh Kumar",
            "rationcardnumber": "KA12345678",
            "category": "AAY",
            "age": 35,
            "sex": "M",
            "mobilenumber": 1234567890,
            "address": "Karnataka",
            "rationamount": "Rice 35Kg",
            "price": "Rs.35",
            "deliveryStatus": "Delivered"
          }, {
            "consumername": "Ravi Raju",
            "rationcardnumber": "KA99345678",
            "category": "PHH",
            "age": 45,
            "sex": "M",
            "mobilenumber": 1234567890,
            "address": "Karnataka",
            "rationamount": "Rice 5Kg",
            "price": "Rs.5",
            "deliveryStatus": "Delivered"
          },{
            "consumername": "Prakash Reddy",
            "rationcardnumber": "KA99345378",
            "category": "PHH",
            "age": 34,
            "sex": "M",
            "mobilenumber": 1234567890,
            "address": "Karnataka",
            "rationamount": "Rice 5Kg",
            "price": "Rs.5",
            "deliveryStatus": "Delivered"
          },{
            "consumername": "Lakshmi Devi",
            "rationcardnumber": "KA93345678",
            "category": "PHH",
            "age": 60,
            "sex": "F",
            "mobilenumber": 1234567890,
            "address": "Karnataka",
            "rationamount": "Rice 5Kg",
            "price": "Rs.5",
            "deliveryStatus": "Delivered"
          },
          {
            "consumername": "Sreenath",
            "rationcardnumber": "KA93325678",
            "category": "PHH",
            "age": 25,
            "sex": "M",
            "mobilenumber": 1234567890,
            "address": "Karnataka",
            "rationamount": "Rice 5Kg",
            "price": "Rs.5",
            "deliveryStatus": "Delivered"
          }]
        let rows = [];
        const dataRows = [];
        for (const consumer of data) {
            dataRows.push({
                data: [
                    consumer.consumername,
                    consumer.rationcardnumber,
                    consumer.category,
                    consumer.age,
                    consumer.sex,
                    consumer.mobilenumber,
                    consumer.address,
                    consumer.rationamount,
                    consumer.price,
                    consumer.deliveryStatus                   
                ],
                metadata: { // not visible in the UI
                    
                }
            });
            this.rows = dataRows.slice();
        }
    }   


    onStateSwitch($event) {}
    onDistrictSwitch($event){}
    onCircleSwitch($event){}
    getDetails(){
        this.fpli.show();
        setTimeout(() => {
            this.getRationDetails();
            this.fpli.conceal();
        },1000);    
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
