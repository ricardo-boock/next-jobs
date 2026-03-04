export interface RemotiveResponse {
  readonly "00-warning"?: string;
  readonly jobs: JobDetails[];
}

export interface JobPreview {
  readonly id: number;
  readonly title: string;
  readonly company_name: string;
  readonly category: string;
  readonly tags: string[];
  readonly job_type: string;
  readonly publication_date: string;
  readonly candidate_required_location: string;
  readonly salary?: string;
}

export interface JobDetails extends JobPreview {
  readonly url: string;
  readonly company_logo_url?: string;
  readonly description: string;
}
