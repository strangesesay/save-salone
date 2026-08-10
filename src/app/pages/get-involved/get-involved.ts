import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-involved',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './get-involved.html',
  styleUrl: './get-involved.scss',
})
export class GetInvolved {

   private readonly fb =
    inject(FormBuilder);


  submitting = false;


  volunteerForm =
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
          Validators.required,
          Validators.pattern(
            /^(?:\+232|0)?7\d{7}$/
          )
        ]
      ],


      location: [
        '',
        Validators.required
      ],


      areaOfInterest: [
        '',
        Validators.required
      ],


      skills: [
        '',
        Validators.required
      ],


      availability: [
        '',
        Validators.required
      ],


      message: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ]

    });


  async submitForm(): Promise<void> {

    if (
      this.volunteerForm.invalid
    ) {

      this.volunteerForm.markAllAsTouched();

      await Swal.fire({

        icon: 'warning',

        title: 'Incomplete Form',

        text:
          'Please complete all required fields before submitting.',

        confirmButtonColor:
          '#0B6E4F'

      });

      return;

    }


    this.submitting = true;


    const formData =
      new FormData();


    const form =
      this.volunteerForm.getRawValue();


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
      'location',
      form.location
    );


    formData.append(
      'areaOfInterest',
      form.areaOfInterest
    );


    formData.append(
      'skills',
      form.skills
    );


    formData.append(
      'availability',
      form.availability
    );


    formData.append(
      'message',
      form.message
    );


    formData.append(
      '_subject',
      'New SAVE SALONE Volunteer Application'
    );


    try {

      const response =
        await fetch(
          'https://formspree.io/f/xpqywwda',
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
          'Form submission failed'
        );

      }


      await Swal.fire({

        icon: 'success',

        title: 'Application Submitted',

        text:
          'Thank you for volunteering with SAVE SALONE. We have received your application and will contact you soon.',

        confirmButtonText:
          'Great',

        confirmButtonColor:
          '#0B6E4F'

      });


      this.volunteerForm.reset();


    } catch (error) {

      console.error(error);


      await Swal.fire({

        icon: 'error',

        title: 'Submission Failed',

        text:
          'We could not submit your application. Please try again later.',

        confirmButtonColor:
          '#0B6E4F'

      });


    } finally {

      this.submitting = false;

    }

  }


  get f() {

    return this.volunteerForm.controls;

  }


}
