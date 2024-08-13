class Beach {
    name: string;
    quality: string;
    description: string;
    temperature: string;
    windSpeed: string;
    funFacts: string;
    sources: string[];
    comments: Comment[];
  
    constructor(
      name: string,
      quality: string,
      description: string,
      temperature: string,
      windSpeed: string,
      funFacts: string,
      sources: string[],
      comments: Comment[]
    ) {
      this.name = name;
      this.quality = quality;
      this.description = description;
      this.temperature = temperature;
      this.windSpeed = windSpeed;
      this.funFacts = funFacts;
      this.sources = sources;
      this.comments = comments;
    }
  
    addComment(comment: Comment) {
      this.comments.push(comment);
    }
  }
  