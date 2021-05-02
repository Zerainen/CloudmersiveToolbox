export interface ApiResult {
  Successful: boolean;
  Highconfidence: boolean;
  BestOutcome: {
    ConfidenceScore: number;
    Description: string;
  }
  RunnerUpOutcome: {
    ConfidenceScore: number;
    Description: string;
  }
}
