const range = document.querySelector(".myrange");
const price = document.querySelector(".price");
const views = document.querySelector(".views");
const bill = document.getElementById("bill");
const subtype = document.querySelector(".subtype");
const pricingMedia = document.querySelector(".price-media");

const priceCost = [8, 12, 16, 24, 36];
const pageviews = [10, 50, 100, 500, 1];

function update() {
  const percentage = (range.value - 1) * 25;
  range.style.background = `linear-gradient(to right,
    hsl(174, 77%, 80%) 0%,
    hsl(174, 77%, 80%) ${percentage}%,
    hsl(224, 65%, 95%) 0%,
    hsl(224, 65%, 95%) 100%)`;
  const priceCount = priceCost[range.value - 1].toFixed(2);
  const discountPrice = priceCost[range.value - 1] * 0.75 * 12;
  const count = range.value == 5 ? "M" : "K";
  pricingMedia.innerHTML = bill.checked
    ? `$${discountPrice}`
    : ` $${priceCount}`;
  price.innerHTML = bill.checked ? `$${discountPrice}` : ` $${priceCount}`;

  views.innerHTML = `${pageviews[range.value - 1]}${count}`;
}
update();
range.addEventListener("input", update);

bill.addEventListener("change", update);

// 10K pageviews / $8 per month
// - 50K pageviews / $12 per month
// - 100K pageviews / $16 per month
// - 500k pageviews / $24 per month
// - 1M pageviews / $36 per month
