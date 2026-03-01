export interface RemotiveResponse {
  "00-warning"?: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo_url: string | null;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string | null;
  description: string;
}

export interface JobPreview {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string | null;
}
