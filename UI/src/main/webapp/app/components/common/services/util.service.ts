import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()

export class UtilService {
    public selectedCartridge = {};
    public selectedCartridgeDisplayName = "";
    public selectedCartridgeConfig = {};
    public cartridgeList = [];
    public selectedAccount = {};
    public selectedAccountAM = {};
    public environmentName = "";
    public environmentNameAM = "";
    public selectedAccountDetails = new Subject<{}>();
    public selectedAccountDetails$ = this.selectedAccountDetails.asObservable();
    public version = {};
    public versionDetails = new BehaviorSubject<any>(" ");
    public versionDetails$ = this.versionDetails.asObservable(); 
    public accountConfig = {};
    public configObject = {};
    public workspaceID = {};
    private accountList = [];
    private roles = [];
    private loggedInUserDetails = {};
    public rolesSubject = new Subject<{}>();
    public roles$ = this.rolesSubject.asObservable();
    public setArticleMenuSubject = new Subject<{}>();
    public setArticleMenuSubject$ = this.setArticleMenuSubject.asObservable();
    public esIndices = [];
    public prodStatus = "";
    public allAccounts = [];
    
    setArticleMenu() {
        this.setArticleMenuSubject.next();
    }

    setProdStatus(prodStatus) {
        this.prodStatus = prodStatus;
    }

    getProdStatus() {
        return this.prodStatus;
    }

    setEsIndices(esIndices) {
        this.esIndices = esIndices;
    }
    
    getEsIndices() {
        return this.esIndices;
    }

    setVersion(version) {
        this.versionDetails.next(version);
    }

    getVersion() {
        return this.version;
    }

    setSelectedCartridgeConfig(config) {
        this.selectedCartridgeConfig = config; 
    }

    getSelectedCartridgeConfig() {
        return this.selectedCartridgeConfig;
    }

    setCartridgeDisplayName(displayName) {
        this.selectedCartridgeDisplayName = displayName;
    }

    getCartridgeDisplayName() {
        return this.selectedCartridgeDisplayName;
    }

    getSelectedCartridge() {
        return this.selectedCartridge;
    }

    setSelectedCartridge(id, name) {
        this.selectedCartridge["id"] = id;
        this.selectedCartridge["name"] = name;
    }

    getSelectedAccount() {
        return this.selectedAccount;
    }

    setSelectedAccount(id, name, view) {
        this.selectedAccount["id"] = id;
        this.selectedAccount["name"] = name;
        if (view !== "accountView") {
            this.selectedAccountDetails.next([id , name]);
        }
    }

    getSelectedAccountAM() {
        return this.selectedAccountAM;
    }

    setSelectedAccountAM(id, name) {
        this.selectedAccountAM["id"] = id;
        this.selectedAccountAM["name"] = name;
    }

    setCartridgeList(cartridgelList) {
        this.cartridgeList = cartridgelList;
    }

    getCartridgeList() {
        return this.cartridgeList;
    }

    setAccountList(accountList) {
        this.accountList = accountList;
    }
    
    getAccountList() {
        return this.accountList;
    }

    setAllAccounts(accounts) {
        this.allAccounts = accounts;
    }

    getAllAccounts() {
        return this.allAccounts;
    }

    setEnvironmentDetails(environmentName) { // Set environment details
        this.environmentName = environmentName;
    }
    
    getEnvironmentDetails() {
        return this.environmentName;
    }

    setEnvironmentAM(environmentName) { // set environment for account management
        this.environmentNameAM = environmentName;
    }

    getEnvironmentAM() {
        return this.environmentNameAM;
    }

    setAccountConfig(key, value) { // Set account config with key and value
        this.accountConfig[key] = value;
    }
    
    getAccountConfig(key) { // Get the account config item given the key
        return this.accountConfig[key];
    }

    setCartridgeConfig(key, value) { // Set config with key and value
        this.configObject[key] = value;
    }
    
    getCartridgeConfig(key) { // Get the config item given the key
        return this.configObject[key];
    }

    setSelectedWorkspaceId(workspaceID) { // Set config with key and value
        this.workspaceID = workspaceID;
    }
    
    getSelectedWorkspaceId() { // Get the config item given the key
        return this.workspaceID;
    }

    setUserRoles(roles) { // Set config with key and value
        this.roles = roles;
        this.rolesSubject.next(roles);
    }
    
    getUserRoles() { // Get the config item given the key
        return this.roles;
    }

    setLoggedInUserDetails(userDetails) {
        this.loggedInUserDetails["userIdentity"] = userDetails.userIdentity;
        this.loggedInUserDetails["userName"] = userDetails.userName;
    }

    getLoggedInUserDetails() { // Get the config item given the key
        return this.loggedInUserDetails;
    }

    isJsonString(str) { // Validate the json and send the error if any
        try {
            JSON.parse(str);
        } catch (e) { 
            return e;
        }
        return "";
    }


/*     public languageList = {'en_US':'English', 'en':'English', 'pt_BR':'Portugese', 'pt':"Portugese", 
                            'es_ES':'Spain', 'es':'Spain', 'fr_FR':'French', 'fr':'French', 
                            'ja_JP': 'Japanese', 'ja':'Japanese', 'it_IT' :'Italian', 'it':'Italian'}
    
    public configObject = {};
    
    private loggedInUserDetails = {};
    
    private selectedAccountDetails = {};
    
    private environmentNameDetails = "";
    
    public accountConfig = {};
    
    getLanguageFullForm(symbol : string) {
        return this.languageList[symbol];
    }
    
    arraymove(arr, fromIndex, toIndex) { //Move value in array from one position to another
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);return arr
    }
    
    setConfig(key, value) { //Set config with key and value
        this.configObject[key] = value;
    }
    
    getConfig(key) { //Get the config item given the key
        return this.configObject[key];
    }
    
    isJsonString(str) { //Validate the json and send the error if any
        try {
            JSON.parse(str);
        } catch (e) { 
            return e;
        }
        return "";
    }
    
    compareArrays(a,b) { //Check arrays for equality
        Array.prototype["equals"] = function( array ) {
            return this.length == array.length && 
                   this.every( function(this_i,i) { return this_i == array[i] } )  
         }
        
        if(a.equals(b)) {
            return true;
        } else {
            return false;
        }
    }
    
    setLoggedInUserDetails(userDetails) { //Set user details
        this.loggedInUserDetails = userDetails;
    }
    
    getLoggedInUserDetails() { //Get user details
        return this.loggedInUserDetails;
    }
    
    getSelectedAccountDetails() {
        return this.selectedAccountDetails;
    }
    
    setSelectedAccountDetails(accountDetails) { //Set selected account details
        this.selectedAccountDetails = accountDetails;
    }
    
    setEnvironmentDetails(environmentName) { //Set environment details
        this.environmentNameDetails = environmentName;
    }
    
    getEnvironmentDetails() {
        return this.environmentNameDetails;
    }
    
    setAccountConfig(key, value) { //Set account config with key and value
        this.accountConfig[key] = value;
    }
    
    getAccountConfig(key) { //Get the account config item given the key
        return this.accountConfig[key];
    }
        
    decodeHTMLEntities(text) { //Decode html content
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (var i = 0, max = entities.length; i < max; ++i) 
            text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

        return text;
    }
    
    replaceFirstOccurenceInString(stringToReplace, oldWord, newWord) { //Replace first occurence
        return stringToReplace.replace(oldWord, newWord)
    } */
}