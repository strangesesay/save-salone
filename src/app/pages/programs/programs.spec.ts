import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Programs } from './programs';

describe('Programs', () => {
  let component: Programs;
  let fixture: ComponentFixture<Programs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Programs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Programs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate filtered programs', () => {
    component.programs = Array.from({ length: 13 }, (_, index) => ({
      id: index + 1,
      title: `Program ${index + 1}`,
      shortDescription: 'Test description',
      description: 'Test description',
      image: 'image.jpg',
      icon: 'bi-check-circle',
      activities: ['Activity'],
      beneficiaries: ['Community'],
      objective: 'Goal',
      impact: 'Impact'
    } as any));

    component.filteredPrograms = component.programs;
    component.currentPage = 2;

    const expectedPage = component.paginatedPrograms;

    expect(component.totalPages).toBeGreaterThan(1);
    expect(expectedPage.length).toBeLessThanOrEqual(component.pageSize);
    expect(expectedPage[0].id).toBeGreaterThan(1);
  });
});
