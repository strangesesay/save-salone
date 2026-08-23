import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonationService } from '../../core/services/donation';
import { Project } from '../../core/interfaces/project.interface';
import { DonationInterface } from '../../core/interfaces/donation.interface';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-modal',
  standalone: true, 
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './donation-modal.html',
  styleUrl: './donation-modal.scss',
})
export class DonationModal {

  private readonly fb = inject(FormBuilder);

  private readonly donationService =
    inject(DonationService);


  @Input()
  visible = false;


  @Input()
  project: Project | null = null;


  @Output()
  closed = new EventEmitter<void>();


  donationForm = this.fb.nonNullable.group({

    donorName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?:\+232|0)?7\d{7}$/
        )
      ]
    ],

    email: [
      '',
      [
        Validators.email
      ]
    ],

    amount: [
      100,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    paymentMethod: [
      'Orange Money'
    ]

  });


  closeModal(): void {
    this.closed.emit();
  }

  onPaymentMethodChange(): void {

    if (
      this.donationForm.controls.paymentMethod.value ===
      'Bank Transfer'
    ) {

      this.showBankInstructions();

    }

  }

  close(): void {

    this.closed.emit();

    this.donationForm.reset({

      donorName: '',

      phone: '',

      email: '',

      amount: 100,

      paymentMethod: 'Orange Money'

    });

  }


  submitDonation(): void {

    if (
      this.donationForm.invalid ||
      !this.project
    ) {

      this.donationForm.markAllAsTouched();

      return;

    }


    const form =
      this.donationForm.getRawValue();


    const donation: DonationInterface = {

      donorName: form.donorName,

      phone: form.phone,

      email: form.email,

      amount: form.amount,

      projectId: this.project.id,

      projectTitle: this.project.title,

      paymentMethod:
        form.paymentMethod as
        'Orange Money' | 'Bank Transfer'

    };


    if (
      donation.paymentMethod ===
      'Orange Money'
    ) {

      this.startOrangeMoney(donation);

      return;

    }


    this.showBankInstructions();

  }


  private startOrangeMoney(
    donation: DonationInterface
  ): void {

    Swal.fire({

      icon: 'info',

      title: 'Continue With Orange Money',

      html: `
        <p>
          You are donating
          <strong>Le ${donation.amount.toLocaleString()}</strong>
          to:
        </p>

        <p>
          <strong>
            ${donation.projectTitle}
          </strong>
        </p>

        <p class="text-muted">
          Your phone will open the USSD
          interface where you can complete
          the transaction.
        </p>

        <small>
          Never enter your Orange Money PIN
          on the SAVE SALONE website.
        </small>
      `,

      showCancelButton: true,

      confirmButtonText:
        'Continue to Orange Money',

      cancelButtonText:
        'Cancel',

      confirmButtonColor:
        '#0B6E4F'

    }).then(result => {

      if (result.isConfirmed) {

        this.donationService
          .initiateOrangeMoneyDonation(
            donation
          );

      }

    });

  }


  private showBankInstructions(): void {

    const bank =
      this.donationService
        .getBankDetails();


    Swal.fire({

      icon: 'info',

      title: 'Bank Transfer',

      html: `

        <div class="text-start">

          <p>
            <strong>Bank:</strong>
            ${bank.bankName}
          </p>

          <p>
            <strong>Account Name:</strong>
            ${bank.accountName}
          </p>

          <p>
            <strong>Account Number:</strong>
            ${bank.accountNumber}
          </p>

          <p>
            <strong>Branch:</strong>
            ${bank.branch}
          </p>

          <p>
            <strong>SWIFT:</strong>
            ${bank.swiftCode}
          </p>

        </div>

      `,

      confirmButtonText:
        'Done',

      confirmButtonColor:
        '#0B6E4F'

    });

  }


}
