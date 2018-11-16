import axios from "axios";

const scraper = async url => {
  if (url.toLowerCase().includes("allrecipes")) {
    try {
      const response = await axios.get(
        "https://allorigins.me/get?url=" + encodeURIComponent(url)
      );
      const html = response.data.contents;
      const parser = new DOMParser();
      const el = parser.parseFromString(html, "text/html");
      const og_title = el.querySelector(`meta[property="og:title" ]`).content;
      const og_sitename = "Allrecipes";
      const og_image = el.querySelector(`meta[property="og:image" ]`).content;
      const og_desc = el.querySelector(`meta[name="description" ]`).content;
      const prep_time = el.querySelector(`span[class="ready-in-time"]`)
        .textContent;
      const rating = el.querySelector(`meta[itemprop="ratingValue"]`).content;
      const servings = el.querySelector(`#metaRecipeServings`).content;
      return {
        og_title,
        og_sitename,
        og_image,
        og_desc,
        prep_time,
        servings,
        rating
      };
    } catch (error) {
      console.log(error);
    }
  } else if (url.toLowerCase().includes("geniuskitchen")) {
    console.log(url);
    try {
      const response = await axios.get(
        "https://allorigins.me/get?url=" + encodeURIComponent(url)
      );
      const html = response.data.contents;
      const parser = new DOMParser();
      const el = parser.parseFromString(html, "text/html");
      // const og_icon = el.querySelector(`link[type="image/x-icon"].href`);
      const og_title = el.querySelector(`meta[property="og:title"]`).content;
      const og_sitename = "geniuskitchen.com";
      const og_image = el.querySelector(`meta[property="og:image"]`).content;
      const og_desc = el.querySelector(`meta[property="og:description" ]`)
        .content;
      const prep_time = el
        .querySelector(`td.time`)
        .textContent.replace(/[\n\r]+|[\s]{2,}/g, " ")
        .trim()
        .match(/\d+.+/g);
      const servings = el.querySelector(`span.count`).textContent;
      const rating = el.querySelector(`span[class="sr-only"]`).textContent;
      const ingredient_list = [];
      const ingredients = document.querySelectorAll("li[data-ingredient]");

      ingredients.forEach(i => {
        ingredient_list.push({
          quantity: i.children[0].textContent.trim(),
          food: i.children[1].textContent.trim()
        });
      });

      const instructions = [];
      const directions = document.querySelectorAll(`div.directions ol li`);

      directions.forEach(i => {
        if (!i.firstElementChild) {
          instructions.push(i.textContent);
        }
      });

      return {
        og_title,
        og_sitename,
        og_image,
        og_desc,
        prep_time,
        servings,
        rating,
        ingredients,
        instructions
      };
    } catch (error) {
      console.log(error);
    }
  }
};

export default scraper;
