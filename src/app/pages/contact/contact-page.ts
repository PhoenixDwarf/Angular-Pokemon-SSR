import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  styles: ``,
})
export default class ContactPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'This is my contact page' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Contact, Page, SSR' });
  }
}
