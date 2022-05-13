# Basic VTEX IO App Template

## Preview
[FAQ and prerequisites](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-frequently-asked-questions#who-can-use-the-solution)

[Some introductory videos explaining the basics](https://drive.google.com/drive/folders/1wooqXJ0RfRFRG2dPTKgZZ_yOTnFm3Q0p?usp=sharing)

You're aiming to publish your baby @ [VTEX App Store](https://apps.vtex.com/). This means you must have a certain knowledge about it's [Guidelines](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-homologation-requirements-for-vtex-app-store).

Don't worry with the publication flow yet. I'll give you proper guidance when it's time.

However if you still are that really curious about [pricing models](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-business-guidelines-app-monetization) and [billing](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-billing-options), I got you [covered](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-setting-your-apps-billing-model).


## IO basics

First, I need to recall that _everything in IO is an app_. The entry point for your application is the manifest.json file.

There, you find the details (name, vendor, version) and basic configs (dependencies and _policies_, which we'll take a look in a sec.) Sort of IO's package.json - which by the way will also be there and require the install command, as usual. You may develop a purely front-, back-end or fullstack app; it's only a matter of importing the right [builders](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-builders#list-of-builders). For example, "store": "0.x"; "node": "6.x"; and both + "react": "3.x", respectively.


### Bureaucracy
As your app will be communicating through APIs, we use policies to describe its capabilities - access to domains and subdomains, logging, events, etc. Be as restrictive as possible when granting these access to your application.

I've already arranged to you the following ones:

**Logistics** - full access, inventory full access, shipping full access, transportation full access
**OMS** - Change order workflow status, Notify payment, View order, Notify refund, Cancel order, Change order, View store sales stats
**Checkout** - Shopping cart full access, Orders full access, Order cancellation

You can check in the manifest.json file.


## Tutorials
There's an intro to VTEX IO Services based on [Service-Example](https://github.com/vtex-apps/service-example) in the node folder.

Also, be sure to check the [Clients](https://github.com/vtex/io-clients/) we provide you out-of-the-box. This may simplify a lot your work, or at least give you some insights on how to proceed.

To understand how frontend things work check our tutorial [Build a store using VTEX IO Store Framework](https://vtex.io/docs/getting-started/build-stores-with-store-framework/1/)


### Admin
Please notice that following our [Styleguide](https://styleguide.vtex.com/) is mandatory.


### Store

Store framework is the baseline to create any store using _VTEX IO Web Framework_.
- [Store](https://github.com/vtex-apps/store/blob/master/README.md)

Store GraphQL is a middleware to access all VTEX APIs.
- [Store GraphQL](https://github.com/vtex-apps/store-graphql/blob/master/docs/README.md)

The store you find here is this [mock theme](https://github.com/vtex-apps/store-theme). I'm only letting it here so that: when you run _vtex link_ you have a test store available + visualize the input of a custom component into the final store code, but keep in mind that your final application won't carry this out (only the proper files to export the converted components it eventually provides, namely interfaces.json and/or plugins.json).

Your app will live in the accounts of the stores in the same way the code of their site does. If between the resources you developed there's a front-end component, the stores will need to declare your app as a dependency in their manifest.json to be allowed the consumption of the block you exports - and then make the proper configurations about where to insert it. You should provide this documentation.

To have a clear sense on this, delete the files related to the ecommerce (sitemap, store/blocks, store/block.jsonc and store/routes.json). Then clone the above linked Store-There, insert your app as dependency in manifest and place it in the proper block/page.



## References

[VTEX Community](https://community.vtex.com) - forum where you can see, ask and reply to questions and discussions with other IO devs
[List of REST APIs](https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis)
