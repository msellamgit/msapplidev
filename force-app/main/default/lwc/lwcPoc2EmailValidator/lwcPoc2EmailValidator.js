import { LightningElement, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import validatePin from "@salesforce/apex/LWC_POC2_EmailValidator.validatePin";
import approveOrRejectIndividualEmail from "@salesforce/apex/LWC_POC2_EmailValidator.approveOrRejectIndividualEmail";
import checkExpirationDate from "@salesforce/apex/LWC_POC2_EmailValidator.checkExpirationDate";

import respoc from '@salesforce/resourceUrl/res_poc2';

export default class LwcPoc2EmailValidator extends LightningElement {
    
    topLeftImageUTALogo = respoc + '/uta_logo.png';
    img_rightSideImage = respoc + '/Email_Verification_Right_Side_Picture.png';
    img_utaEdenredLogoTopRight = respoc + '/Email_Verification_Right_Side_Picture.png';
    img_redLineInHeader = respoc + '/Email_Verification_Right_Side_Picture.png';

    //bodyContainerLeftSideComponentsClass = "bodyContainerLeftSideComponentsHidden";
    rightSideImageStyleClass = "rightSideImageStyle";
    pinValidationMessageStyleClass = "pinValidationMessageStyle1";
    pinInputStyleClass = "pinInputStyle";
    //verifyEmailAddressButton;
    //pinValidationMessageLabel;
    pinValidationMessage = "";
    emailVerificationTitleMessage = 'UTA Edenred email verification';
    weSimplifyMobilityMessage = 'we simplify mobility';
    pinNumberComposedMessage = 'Enter your PIN';
    verifyEmailButtonTextMessage = 'Verify';
    actionMessage = "";
    pleaseEnterPINMessage = 'Please enter the verification PIN we emailed you';
    //showActionMessage = false;
    showPinValidationMessage = false;
    disableVerifyEmailAddressButton = true;
    showLeftSideInputComponentsFlag = false;
  
    /*
    renderedCallback() {
        this.verifyEmailAddressButton = this.template.querySelector( ".verifyEmailButtonStyle" );
    }
    */

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        let jsonTest = pageRef;
        console.log('CurrentPageReference');
        console.log(jsonTest);
        console.log(jsonTest.state);

        if (jsonTest.state.value) {
            this.encryptedId = decodeURIComponent(jsonTest.state.value);//.slice(0, -1);
            this.checkLinkExpiration(this.encryptedId, "approvalCase");
        } else if (jsonTest.state.reject) {
            this.encryptedId = decodeURIComponent(jsonTest.state.reject);//.slice(0, -1);
            this.checkLinkExpiration(this.encryptedId, "rejectionCase");
        }
        console.log(this.encryptedId);
    }

    verifyEmailAddress() {
        this.showSpinnerOnButton();
        this.handleApprove();
    }

    showSpinnerOnButton() {
        let verifyEmailAddressButton = this.template.querySelector( ".verifyEmailButtonStyle" );

        verifyEmailAddressButton.classList.add( "verifyEmailButtonStyle__loading");
        verifyEmailAddressButton.style.background = "#D1D8E0";
        verifyEmailAddressButton.style.border = "transparent";
    }

    validateInputPin(event) {
        let inputValue = event.target.value;
        if (inputValue.length === 6) {
            this.hadnlePinValidation(inputValue);
        }
    }

    hadnlePinValidation(inputValue) {
        validatePin({ encryptedId: window.btoa(this.encryptedId), passedPin: window.btoa(inputValue)})
            .then((response) => {
                console.log(response);
                this.showPinValidationMessage = true;
                if (response !== "no email found") {
                    this.handlePinCorrect(response);
                    return;
                }
                this.handlePinIncorrect();
            })
            .catch((e) => {
                console.log(e);
                console.log(e.message);
            });
    }

    checkLinkExpiration(encryptedId, caseOption) {
        console.log('checkLinkExpiration');
        console.log(encryptedId);
        console.log(window.btoa(encryptedId));
        console.log(caseOption);
        
        checkExpirationDate({ encryptedId: window.btoa(encryptedId) })
            .then((result) => {
            if (result === "True" && caseOption === "approvalCase") {
                this.showLeftSideInputComponentsFlag = true;
                //this.bodyContainerLeftSideComponentsClass = "bodyContainerLeftSideComponents";
                return;
            } else if (result === "True" && caseOption === "rejectionCase") {
                this.handleReject();
                return;
            }
            this.actionMessage = result;
            this.showLeftSideInputComponentsFlag = false;
            }
        );
    }

    handleApprove() {
        approveOrRejectIndividualEmail({ encryptedId: window.btoa(this.encryptedId), status: window.btoa(true)})
        .then((response) => {
            this.handleFinalStep(response, "approved");
        });
    }

    handleReject() {
    //this.showSpinner = true;
        approveOrRejectIndividualEmail({ encryptedId: window.btoa(this.encryptedId), status: window.btoa(false)})
        .then((response) => {
        this.handleFinalStep(response, "rejected");
        });
    }

    handleFinalStep(response, actionStatusFlag) {
        this.showLeftSideInputComponentsFlag = false;

        if (actionStatusFlag === "approved") {
            this.actionMessage =
            response === true
                ? 'Thanks for validating your email address.'
                : response;
        } else {
            this.actionMessage =
            response === true
                ? 'If you change your mind, please contact UTA Edenred on +44 1737-907850 for re-verification.'
                : response;
        }
    }

    handlePinCorrect(email) {
        this.pinValidationMessage = 'PIN correct';
        this.disableVerifyEmailAddressButton = false;
        this.pinInputStyleClass = "pinInputStyleCorrect";
        this.retrievedEmail = email;
        this.pinValidationMessageStyleClass = "pinValidationMessageStyle1";
    }

    handlePinIncorrect() {
        this.disableVerifyEmailAddressButton = true;
        this.pinValidationMessageStyleClass = "pinValidationMessageStyle2";
        this.pinInputStyleClass = "pinInputStyleIncorrect";
        this.pinValidationMessage = 'PIN incorrect';
    }
}