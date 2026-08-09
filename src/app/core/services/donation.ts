import { Injectable } from '@angular/core';

import { DonationInterface } from '../interfaces/donation.interface';

import { DONATION_CONFIG }
  from '../constants/donation.config';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  generateOrangeMoneyUSSD(
    donation: DonationInterface
  ): string {

    const amount = donation.amount;

    /*
     * IMPORTANT:
     * Replace this construction with the exact
     * Orange Money merchant/agent USSD format
     * used by your account.
     */

    return `${DONATION_CONFIG.orangeMoney.ussdPrefix}`;

  }


  initiateOrangeMoneyDonation(
    donation: DonationInterface
  ): void {

    const ussd =
      this.generateOrangeMoneyUSSD(donation);

    const encodedUSSD =
      encodeURIComponent(ussd);

    window.location.href =
      `tel:${encodedUSSD}`;

  }


  getBankDetails() {

    return DONATION_CONFIG.bank;

  }

}
