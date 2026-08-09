export interface DonationInterface {

    donorName: string;
  
    phone: string;
  
    email?: string;
  
    amount: number;
  
    projectId: number;
  
    projectTitle: string;
  
    paymentMethod: 'Orange Money' | 'Bank Transfer';
  
  }