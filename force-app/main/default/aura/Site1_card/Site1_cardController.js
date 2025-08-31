({
	myAction : function(component, event, helper) {
		
	}, 
    doInit: function(component) {
        // Set the attribute value. 
        // You could also fire an event here instead.    
    //var numbers = [];
    //for (var i = 0; i < 3; i++) {
    //  numbers.push({ value: i });
    //}
    //component.set("v.numbers", numbers); 

	var competences = [];
    competences.push({ titre: "Directeur de projet Salesforce IT", 
                      duree: "2 ans",                       
                      detail1 : "Déploiement groupe (5 pays)",
                      detail2 : "Développements et Paramétrage", 
                      detail3 : "TMA - Assistance Utilisateurs "});
    competences.push({ titre: "Responsable de Domaine SI CRM", 
                      duree: "11 ans",                       
                      detail1 : "Déploiement et TMA",
                      detail2 : "Solution Pivotal", 
                      detail3 : "Développements et Corrections"});
    competences.push({ titre: "Gestion Projets Transverses", 
                      duree: "GED - Interface Back Office",                       
                      detail1 : "Extranet B2B",
                      detail2 : "Reporting Commercial Groupe", 
                      detail3 : "Qualité des Données"});
 	component.set("v.competences", competences); 
    }
})