export interface IFormResponse {
  artist_id: string;
  clientName: string;
  clientEmail: string;
  message: string;
  duration: string;
  appointment: {
    day: string;
    startTime: string;
    endTime: string;
  };
  statusOfClient: string;
}
