import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Oopertunites } from './oopertunites';

describe('Oopertunites', () => {
  let component: Oopertunites;
  let fixture: ComponentFixture<Oopertunites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oopertunites],
    }).compileComponents();

    fixture = TestBed.createComponent(Oopertunites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
