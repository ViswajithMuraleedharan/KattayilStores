# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
├── context/CartContext.jsx       — global cart + dark mode state
├── data/dummy.js                 — all dummy data
├── components/
│   ├── Navbar.jsx                — sticky nav with cart badge + dark toggle
│   ├── Footer.jsx                — 4-column footer
│   ├── PublicLayout.jsx          — wraps public pages
│   ├── AdminLayout.jsx           — collapsible sidebar admin shell
│   ├── ProductCard.jsx           — reusable product card
│   └── StatusBadge.jsx           — colored status pill
└── pages/
    ├── Home.jsx                  — hero, features, how it works, products, testimonials, CTA
    ├── RepairRequest.jsx         — form + image upload + success modal with ticket ID
    ├── TrackRepair.jsx           — search by ticket/phone + animated timeline
    ├── Shop.jsx                  — category filters + search + product grid
    ├── ProductDetails.jsx        — gallery, features, WhatsApp inquiry, related products
    ├── Cart.jsx                  — qty controls, remove, order summary
    ├── Checkout.jsx              — delivery/payment options + order confirmation modal
    ├── Contact.jsx               — contact form + shop info + WhatsApp CTA
    └── admin/
        ├── Dashboard.jsx         — stats cards + recent repairs/orders
        ├── Repairs.jsx           — table + edit/status modal + WhatsApp button
        ├── Products.jsx          — table + add/edit/delete modals
        ├── Orders.jsx            — table + order detail/status modal
        └── Customers.jsx         — table + customer profile with repair/order history
