
function  scanCode(){
    // Enable scan events for the entire document
    onScan.attachTo(document);
    // Register event listener
    // document.addEventListener('scan', function(sScancode, iQuantity) {
    //     // alert(iQuantity + 'x ' + sScancode.detail.scanCode); 
    //     console.log(sScancode.detail.scanCode);
    //     return sScancode.detail.scanCode;
    // });
}
 