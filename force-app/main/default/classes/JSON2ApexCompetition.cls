public class JSON2ApexCompetition {
	public class Area {	public Integer id; public String name;	}

	public class Winner { public Integer id; public String name; 
		public String shortName; public String tla;	public Object crestUrl;}

	public class CurrentSeason {public Integer id; public String startDate;
		public String endDate; public Integer currentMatchday;public Object winner;}

	public class Competitions {
		public Integer id;
		public Area area;
		public String name;
		public Object code;		
		public Object emblemUrl;		
		public String plan;		
		public CurrentSeason currentSeason;		
		public Integer numberOfAvailableSeasons;		
		public String lastUpdated;	
	}
	
	public List<Competitions> competitions;

	public static JSON2ApexCompetition parse(String json) {
		return (JSON2ApexCompetition) System.JSON.deserialize(json, JSON2ApexCompetition.class);}
}