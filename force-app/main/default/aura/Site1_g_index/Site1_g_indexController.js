({
    doInit: function(component) {
        var menu = [];
        menu.push({ titre: "Note de Frais",  img: "/resource/1511477345000/project_mse__logoIDsel", name: "NDF"});
        menu.push({ titre: "Map", img: "standard:client", name: "MAP"});
        menu.push({ titre: "Clients", img: "standard:client", name: "CLT"});
        menu.push({ titre: "Activité", img: "standard:event", name: "ACT"});
        menu.push({ titre: "Rapport", img: "standard:dashboard", name: "RPT"});
        menu.push({ titre: "bourse", img: "standard:contact", name: "BRS"});        
        component.set("v.menu", menu); 
    },
    onClick: function (component, event){
        var btn = event.getSource().get("v.name");
        console.log(btn);
        //if (btn == "NDF") { window.MenuGestion = 'NDF';
        window.MenuGestion = btn;
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({"url": "/gestion"});
            urlEvent.fire();            
        
    }
})
//standard:note,