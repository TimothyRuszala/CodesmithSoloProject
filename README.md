# CodesmithSoloProject

## Notes:

price_id (or priceID, or price_ID...) is very inconsistent, and could be refactored.

App.jsx and index.js could use some refactoring, so that instead of each route individually rendering <Header />,
<Header /> is rendered just once.

useEffect is messed up because it calls 'useState.' That needs to be refactored, because it causes the page
to flicker a lot.

Add emoji can definitely be made more smooth.

A testing suite is critical.

An idea for the stripe functionality is to go into the stripe dashboard, and rename products so that the
product name contains the emoji the name describes.

Add a little red circle to the top left of the cart symbol, which will display the number of items in cart.

Make it so that no more than one copy of an emoji can be added to the cart.

Make sure it works in production.

