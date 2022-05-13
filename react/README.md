### What's going on here?
To fully understand, please go [through](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-routes) [those](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-4-configuringtemplates) [links](https://developers.vtex.com/vtex-developer-docs/docs/store-framework-apps)

Every interface coded to IO is written as a React component. What differs them is where they're going to be rendered: in the Administration Panel or to the Store Front (for the end customer)?

Once you have this answer, you'll only need to [_translate_](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-interface) from React to the proper builder. Take a look at ../admin/routes.json or ../store/interfaces.json and you'll get what I mean.

The HWStore component is based on this [example](https://github.com/vtex-trainings/store-block-template) of a [custom block](https://learn.vtex.com/docs/course-store-block-lang-en) for the Store Framework, and by the same logic there's HWAdmin.


## Resources

We provide you UI components for building [Admin](https://styleguide.vtex.com/) and Storefront resources. 


### Store Component Apps
All store components that you see on this document are open source too. Production ready, you can found those apps in this GitHub organization.

- [Header](https://github.com/vtex-apps/store-header/blob/master/docs/README.md)
- [Footer](https://github.com/vtex-apps/store-footer/blob/master/docs/README.md)
- [Slider Layout](https://github.com/vtex-apps/slider-layout/blob/master/docs/README.md)
- [Shelf](https://github.com/vtex-apps/shelf/blob/master/docs/README.md)
- [Telemarketing](https://github.com/vtex-apps/telemarketing/blob/master/docs/README.md)
- [Menu](https://github.com/vtex-apps/menu/blob/master/docs/README.md)
- [Login](https://github.com/vtex-apps/login/blob/master/docs/README.md)
- [Minicart](https://github.com/vtex-apps/minicart/blob/master/docs/README.md)
- [Category Menu](https://github.com/vtex-apps/category-menu/blob/master/docs/README.md)
- [Product Summary](https://github.com/vtex-apps/product-summary/blob/master/docs/README.md)
- [Breadcrumb](https://github.com/vtex-apps/breadcrumb/blob/master/docs/README.md)
- [Search Result](https://github.com/vtex-apps/search-result/blob/master/docs/README.md)
- [Product Details](https://github.com/vtex-apps/product-details/blob/master/docs/README.md)
- [Store Components](https://github.com/vtex-apps/store-components/blob/master/docs/README.md)
- [Order Placed](https://github.com/vtex-apps/order-placed/blob/master/docs/README.md) 
- [Store-Sitemap](https://github.com/vtex-apps/store-sitemap)
- [Modal Layout](https://github.com/vtex-apps/modal-layout)

[**How to consume product information from the Store's Backend in my component?**](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-7-consuming-data)
    [GitHub example](https://github.com/vtex-apps/product-context)

[**How do I change the layout of My Account page?**](https://github.com/vtex-apps/my-account/tree/1.x)
    This is where the users can see and manage their orders.

### Store [Pixel](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-1-developnativeintegrationswithpixelapps) Apps

 - [Events available to be listened to](https://github.com/vtex-apps/pixel-app-template/blob/master/react/typings/events.d.ts)
 - [Facebook Pixel](https://github.com/vtex-apps/facebook-pixel/blob/master/docs/README.md)
 - [Google Tag Manager](https://github.com/vtex-apps/google-tag-manager/blob/master/docs/README.md)