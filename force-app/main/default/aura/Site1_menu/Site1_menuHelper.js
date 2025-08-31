({
    setmenuevt : function(cmp) {
        console.log("setmenuevt");
	        //var evt = $A.get("e.c:Site1_evt_menu");        
        //evt.setParams({ "menugestion": 'index'});
        //evt.fire();
        var cmpevt = cmp.getEvent("mngestion");
		cmpevt.fire();
        setparamurl();
    },
    setparamurl : function() {
        console.log("setparamurl");
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/gestion"
        });
        urlEvent.fire();
    }
})