# Assignment 3A - August Terrell

## Project Setup & Execution Instructions

1. Install Node.js (version 24.20.0 or higher) from [this](https://nodejs.org/en/download) link. This will also install the npm package manager, which you will need at version 11.19.0 or higher.
2. Clone this repository to your computer (you can find instructions on how to do so at [this](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)) link. Then, open the cloned repository in your preferred code editor.
3. In a bash terminal, navigate to the project directory using `cd p3_vinylvault`.
4. Use `npm install` to install the required dependencies.
5. Once all dependencies have been installed, use `npm run dev` to start the development server. Open the resulting link in your browser.
6. Confirm a proper connection by editing the `App.jsx` file and checking the website to see if it reflects your changes.

### Project Directory Structure

The `public` folder only contains assets the user's machine will need to load outside of the website (i.e. the favicon), while the `src` folder contains all custom code. Within `src`, the `assets` and `data` folders contain media and data needed within the site, and the `components` and `pages` folders contain the .jsx files used to render the site's actual content. The `App.jsx` file serves as a "staging area" for the pages and components, and the `main.jsx` file, which references `App.jsx`, is referenced by index.html and processed into JavaScript, which is then transformed into HTML content.

## React Component Hierarchy & State Flow Architecture

```text
<App /> -> src/App.jsx (Owns: cart [Array] , isCartOpen [Boolean])
    <NavBar cartCount=[Number] onOpenCart() /> -> src/components/NavBar.jsx (Sticky: Logo, HomePage link, cart button with item count)
    
    <Routes>
        <Route path="/" element={<HomePage albums=[Array] addToCart(album) /> -> src/pages/HomePage.jsx} />
            <div className="home-container">
                <header className="catalog-hero">
                <div className="filter-bar"> (Button group to update selected genre, rendered with .map() iterator)
            
                <div className="album-grid"> (CSS grid of album cards)
                <AlbumCard album=[String] addToCart(album) /> (Rendered with .map() iterator)
                    <Link className="album-img-link" to={`/albums/${album.id}`} />
                    <div className="album-body">

        <Route path="/albums/:albumID" element={<AlbumPage albums=[Array] addToCart(album) /> -> src/pages/AlbumPage.jsx} />
            <div className="album-container">
                <nav className="breadcrumb-nav"> (Breadcrumb navigation bar)

                <div className="details-grid"> (CSS grid of information & actions for the specified album)
                    <div className="details-info">
                    <div className="details-actions"> (Controls to increase/decrease quantity and add to cart)
    
        <Route path="/checkout" element={<CheckoutPage cart=[Array] clearCart() /> -> src/pages/CheckoutPage.jsx} />
            <div className="cart-empty"> (Renders only if checkout page is accessed while cart empty)
                <Link className="btn btn-secondary" to="/" />
            
            <div className="checkout-container"> (Default content if cart not empty and form not submitted) 
                <div className="checkout-grid"> (CSS grid for form and order summary)
                    <form className="checkout-form"> (React web form for customer details)
                    <aside className="order-summary">
                        <ul className="item-list"> (List of items to be purchased)
                            <li className="summary-row" key={item.id}> (Rendered with .map() iterator)
                        <div className="summary-row"> (x3, for subtotal, tax, and total)

            <div className="checkout-success"> (Renders when checkout form is submitted)
                <Link className="btn btn-primary" to="/" />
    </Routes>

    <CartDrawer cart=[Array] isOpen=[Boolean] onClose() onUpdateQty(albumID, qty) onRemove(albumID) /> -> src/components/CartDrawer.jsx
        <div className="drawer-overlay" onClick={onClose()}>
            <aside className="drawer-panel" onClick> (Stop event bubbling to prevent cart from closing when clicked on)
                <div className="drawer-header">
                <div className="drawer-body">
                    <div className="empty-cart"> (Renders only if cart is currently empty)

                    <ul className="cart-list"> (List of items in cart)
                        <li className="cart-item" key={item.id}> (Rendered with .map() iterator)
                            <div className="item-info">
                                <div className="qty-controls"> (Controls to increase/decrease quantity of item in cart)
                <div className="drawer-footer"> (Renders only if cart is not empty)
                    <div className="subtotal-row">
                    <button className="btn btn-primary btn-block" type="button" onClick> (Uses the useNavigate hook to automatically redirect to the checkout page)
```
