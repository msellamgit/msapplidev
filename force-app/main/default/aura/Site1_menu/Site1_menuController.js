({
    doInit : function(component, event, helper) {        
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var UserConnect = false;
        if (typeof userId != "undefined") { UserConnect = true };
        component.set("v.UserConnect", UserConnect);	
        //console.log("------  LOG USER ID : " + typeof userId);        
        //console.log("------  LOG USER ID 2 : " + userId.size);        
    },    
    btn_cv : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/cv"
        });
            urlEvent.fire();
    },
    btn_home : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/"
        });
        urlEvent.fire();		
    },
    btn_contact : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/contact"
        });
        urlEvent.fire();		
    },    
    btn_connect : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/idsellogin"
        });
        urlEvent.fire();		
    },
    btn_gestion : function(component, event, helper) {        
        //helper.setmenuevt();
		//helper.setparamurl();
		//helper.setmenuevt(component, function() {
          //helper.setparamurl();
        //});
		window.MenuGestion = 'index';
        console.log(window.MenuGestion);
		var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({"url": "/gestion"});
        urlEvent.fire();
		//helper.setmenuevt(component);                
    },
    btn_logout : function(component, event, helper) 
    {
        var urlsitedisc = window.location.href;
    	var urlCut = window.location.href.split("/");
    //console.log("window.location.href : " + window.location.href);
        //console.log("getSalesforceBaseUrl : " + URL.getSalesforceBaseUrl().toExternalForm());
        
        if(urlCut[urlCut.length-2] === "s" ) {
            //console.log(urlsitedisc.substring(0, urlsitedisc.length - 2 ));
            urlsitedisc = urlsitedisc.substring(0, urlsitedisc.length - 2 );
            urlsitedisc = urlsitedisc + "/secur/logout.jsp";//?retUrl=Home"; 
        }
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({"url": urlsitedisc});// , "isredirect" :false});
        urlEvent.fire();		
    }        
})