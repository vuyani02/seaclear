class Report {
    username: string;
    beachName: string;
    report: string;
    date: string;
    source: string;
  
    constructor(username: string, beachName: string, report: string, date: string, source: string) {
      this.username = username;
      this.beachName = beachName;
      this.report = report;
      this.date = date;
      this.source = source;
    }
  }