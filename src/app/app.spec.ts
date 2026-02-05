import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: `<nav class="test-class"><a href="test-link">Test Link</a></nav>`,
})
class MockNavbar {}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    // Options to handle inner components with dependencies and fix the error: "No provider found for `xxx`."
    // This error happens because the App component imports the Navbar component that has inner imports from router module
    //
    // --------
    //
    // #1 - Provide components, modules, services, etc
    // Following example will make it an integration test rather than a unit test.
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])],
    // }).compileComponents();
    //
    // --------
    //
    // #2 - Override (add and remove) inner component with a mock
    //
    // await TestBed.configureTestingModule({
    //   imports: [App],
    // })
    //   .overrideComponent(App, {
    //     add: {
    //       imports: [MockNavbar],
    //     },
    //     remove: {
    //       imports: [Navbar],
    //     },
    //   })
    //   .compileComponents();
    //
    // --------
    //
    // #3 - Override (set) inner component with a mock
    // Warning !!!
    // Using this method will replace all imports with the ones given in the imports array.
    // This will not throw errors and stop the test if there are missing components, it will just log them
    // into the console instead (this can also be avoided by adding CUSTOM_ELEMENTS_SCHEMA, not recommended).

    TestBed.overrideComponent(App, {
      set: {
        imports: [MockNavbar],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    // --------

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => expect(app).toBeTruthy());

  it('Should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  // Following test is not longer recommended

  // Snapshot -> Photograph of HTML

  // This test creates an snapshot if there wasn't one before and saves it into src/app/_snapshots_
  // If it finds a snapshot it will compare it to the current html output.

  // Since nowadays we use tools such as tailwind or boostrap helper classes the HTML may vary over time
  // and the test will probably fail frequently
  // Note: If test fails and the modified HTML is the desired one, vitest lets us update the snapshot by pressing "U"

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML);

    expect(compiled.innerHTML).toMatchSnapshot();
  });
});
