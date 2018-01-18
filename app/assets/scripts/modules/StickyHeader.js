import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    this.siteHeader = $('.site-header');
    this.headerTriggerElement = $('.large-hero__title');

    this.createHeaderWaypoints();

    this.pageSections = $('.page-section');
    this.headerLinks = $('.primary-nav a');
    this.createPageSectionWaypoints();

    this.addSmoothScrolling();

    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load', () => {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoints() {
    const self = this;

    new Waypoint({
      element: self.headerTriggerElement[0],
      handler: function(direction) {
        if (direction === 'down') {
          self.siteHeader.addClass('site-header--dark');
        } else {
          self.siteHeader.removeClass('site-header--dark');
        }
      }
    });
  }

  createPageSectionWaypoints() {
    const self = this;

    this.pageSections.each(function() {
      const currentPageSection = this;

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'down') {
            const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            self.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '18%'
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'up') {
            const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            self.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '-40%'
      });

    });
  }
}

export default StickyHeader;