import '@stencil/router';
import { Component, Element, Listen, State, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    'main'
  ];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el).classList.remove('left-sidebar-in');
        });
      }
    });
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  toggleLeftSidebar = () => {
    if (window.innerWidth >= 768) {
      return;
    }
    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.remove('left-sidebar-in');
        this.el.querySelector(el).classList.add('left-sidebar-out');
      });
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.add('left-sidebar-in');
        this.el.querySelector(el).classList.remove('left-sidebar-out');
      });
    }
  }

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <site-top-bar />
        <site-header />
        <main>
          <div class="container">
            <stencil-router scrollTopOffset={0}>
              <stencil-route-switch>
                <stencil-route url="/" component="landing-page" exact={true} />
                <stencil-route url="/docs/:pageName" routeRender={({ match }) => (
                  <doc-component page={match.url}></doc-component>
                )}/>
                <stencil-route url="/demos" component="demos-page" />
                <stencil-route url="/pwa" component="pwas-page" />
                <stencil-route url="/resources" component="resources-page" />
                <stencil-route url="/design-systems" component="ds-page" />
                <stencil-route component='notfound-page'></stencil-route>
              </stencil-route-switch>
            </stencil-router>
          </div>
          <footer>
            <div class="container">
              <div class="footer__open-source">
                <a
                  href="http://ionicframework.com/"
                  title="IonicFramework.com"
                  rel="noopener">
                  <img
                    src="/assets/img/ionic-os-logo.png"
                    alt="Ionic Open Source Logo" />
                </a>
                <p>
                  Released under <span id="mit">MIT License</span> | Copyright @ 2018
                </p>
              </div>

              <div class="footer__icons">
                <a
                  class="svg-button"
                  id="stencil-twitter"
                  href="https://twitter.com/stenciljs"
                  target="_blank"
                  rel="noopener"
                  title="Open the stencil account on twitter">
                  <app-icon name="twitter"></app-icon>
                </a>
                <a
                  class="svg-button"
                  id="ionic-forum"
                  href="https://stencil-worldwide.herokuapp.com"
                  target="_blank"
                  rel="noopener"
                  title="Join the stencil worldwide slack">
                  <app-icon name="slack"></app-icon>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </SiteProviderConsumer.Provider>
    );
  }
}
