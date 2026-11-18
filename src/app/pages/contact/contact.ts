import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb =
    inject(FormBuilder);


  submitting = false;


  contactForm =
    this.fb.nonNullable.group({

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],


      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],


      phone: [
        '',
        [
          Validators.pattern(
            /^(?:\+232|0)?7\d{7}$/
          )
        ]
      ],


      subject: [
        '',
        Validators.required
      ],


      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]

    });


  get f() {

    return this.contactForm.controls;

  }


  async submitForm(): Promise<void> {

    if (
      this.contactForm.invalid
    ) {

      this.contactForm.markAllAsTouched();

      await Swal.fire({

        icon: 'warning',

        title: 'Incomplete Form',

        text:
          'Please complete all required fields before sending your message.',

        confirmButtonColor:
          '#0B6E4F'

      });

      return;

    }


    this.submitting = true;


    const form =
      this.contactForm.getRawValue();


    const formData =
      new FormData();


    formData.append(
      'fullName',
      form.fullName
    );


    formData.append(
      'email',
      form.email
    );


    formData.append(
      'phone',
      form.phone
    );


    formData.append(
      'subject',
      form.subject
    );


    formData.append(
      'message',
      form.message
    );


    formData.append(
      '_subject',
      `SAVE SALONE Contact: ${form.subject}`
    );


    try {

      const response =
        await fetch(
          'https://formspree.io/f/YOUR_CONTACT_FORM_ID',
          {
            method: 'POST',

            body: formData,

            headers: {
              Accept:
                'application/json'
            }
          }
        );


      if (!response.ok) {

        throw new Error(
          'Unable to submit contact form'
        );

      }


      await Swal.fire({

        icon: 'success',

        title: 'Message Sent',

        text:
          'Thank you for contacting SAVE SALONE. We will get back to you as soon as possible.',

        confirmButtonText:
          'Done',

        confirmButtonColor:
          '#0B6E4F'

      });


      this.contactForm.reset();


    } catch (error) {

      console.error(error);


      await Swal.fire({

        icon: 'error',

        title: 'Message Not Sent',

        text:
          'Something went wrong while sending your message. Please try again later.',

        confirmButtonColor:
          '#0B6E4F'

      });


    } finally {

      this.submitting = false;

    }

  }

}
