import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styles: ``,
})
export default class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // With the following validation we can use browser objects without generating server errors
    // BUT FOR THINGS SUCH AS SETTING TITLES AND META TAGS DO IT BY INJECTING THE RESPECTIVE SERVICE FROM platform-browser

    // if (isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page';
    // }

    // console.log(document);

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'This is the pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pricing, Page, SSR' });
  }
}
