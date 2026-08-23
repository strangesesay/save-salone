import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery } from './gallery';

describe('Gallery', () => {
  let component: Gallery;
  let fixture: ComponentFixture<Gallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate filtered gallery items', () => {
    component.media = Array.from({ length: 16 }, (_, index) => ({
      id: index + 1,
      title: `Gallery ${index + 1}`,
      description: 'A sample gallery item',
      category: 'Education',
      type: 'image',
      image: 'gallery.jpg',
      createdAt: '2024-01-01'
    } as any));

    component.filteredMedia = component.media;
    component.currentPage = 2;

    expect(component.totalPages).toBeGreaterThan(1);
    expect(component.paginatedMedia.length).toBeLessThanOrEqual(component.pageSize);
    expect(component.paginatedMedia[0].id).toBeGreaterThan(1);
  });
});
