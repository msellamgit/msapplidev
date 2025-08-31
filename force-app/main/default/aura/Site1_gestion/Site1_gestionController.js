({
    getmenufromevent : function(cmp, event) {
        var ShowResultValue = event.getParam("menugestion");
        // set the handler attributes based on event data
        cmp.set("v.Get_Result", ShowResultValue);
    },
    doInit: function(component) {
		component.set("v.getmenu", window.MenuGestion);
    }
})