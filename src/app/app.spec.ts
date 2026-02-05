import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      // Following line fixes the error "No provider found for `ActivatedRoute`."
      // Adding it will make this an integration test rather than a unit test.
      // This error happens because the App component imports the Navbar component that has inner imports from router module
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    console.log(fixture.nativeElement.innerHTML);

    expect(app).toBeTruthy();
  });
});
