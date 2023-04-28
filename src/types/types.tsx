export interface Feedback {
  id: number;
  message: string;
  rating: number;
  positive: boolean;
  improve: string;
  targets: string[];
  changes: string[];
}
