export interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    duration: string;
    budget: string;
    status: 'Ongoing' | 'Completed' | 'Upcoming';
    image: string;
    description: string;
    objectives: string[];
    beneficiaries: string[];
    startDate: string;
    endDate: string;
  }