import axios from "axios";

const scraper = async url => {
  try {
    const response = await axios.get(
      "https://allorigins.me/get?url=" + encodeURIComponent(url)
    );
    const html = response.data.contents;
    const parser = new DOMParser();
    const el = parser.parseFromString(html, "text/html");
    const og_title = el.querySelector(`meta[property="og:title" ]`).content;
    const og_sitename = el.querySelector(`meta[property="og:site_name" ]`)
      .content;
    const og_image = el.querySelector(`meta[property="og:image" ]`).content;
    const og_desc = el.querySelector(`meta[name="description" ]`).content;
    const prep_time = el.querySelector(`time[itemprop="prepTime"]`).textContent;
    const cook_time = el.querySelector(`time[itemprop="cookTime"]`).textContent;
    const total_time = el.querySelector(`time[itemprop="totalTime"]`)
      .textContent;
    const rating = el.querySelector(`meta[itemprop="ratingValue"]`).content;
    return {
      og_title,
      og_sitename,
      og_image,
      og_desc,
      prep_time,
      cook_time,
      total_time,
      rating
    };
  } catch (error) {
    console.log(error);
  }
};
export default scraper;
