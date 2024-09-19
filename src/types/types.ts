// src/types/types.ts
export type Beach = {
  id: number;
  name: string;
  urlName: string;
  location: string;
  status: string;
  description: string;
  current_temperature: number;
  current_rain: string;
  current_wind_speed: number;
  saturday_temperature: number;
  saturday_rain: string;
  saturday_wind_speed: number;
  sunday_temperature: number;
  sunday_rain: string;
  sunday_wind_speed: number;
  picture: string;
  funFacts: string;
  average_rating: number,
  comments: string[];
};
