import axios from "axios";

const og_scraper = el => {
  const og_title = el.querySelector(`meta[property="og:title" ]`);
  const og_image = el.querySelector(`meta[property="og:image" ]`);
  const og_desc = el.querySelector(`meta[name="description" ]`);
  return {
    og_title: og_title ? og_title.content : null,
    og_image: og_image ? og_image.content : null,
    og_desc: og_desc ? og_desc.content : null
  };
};

const convert_single_quantity = quant => {
  let quantity = 0;
  if (quant.includes("/")) {
    let [a, b] = quant.split("/");
    quantity = Number(a) / Number(b);
  } else if (quant.includes(String.fromCharCode(8260))) {
    let [a, b] = quant.split(String.fromCharCode(8260));
    quantity = Number(a) / Number(b);
  } else {
    quantity = Number(quant);
  }
  return Math.round(quantity * 100) / 100;
};

const convert_quantity = quant => {
  if (quant.split(" ").length === 1) {
    return convert_single_quantity(quant);
  } else {
    let first, second;
    if (quant.includes("-")) [first, second] = quant.split("-");
    [first, second] = quant.split(" ");
    const first_num = convert_single_quantity(first);
    const second_num = convert_single_quantity(second);
    if (first_num > second_num) {
      return first_num + second_num;
    } else {
      return second_num;
    }
  }
};

const scraper = async url => {
  try {
    const response = await axios.get(
      "https://api.allorigins.ml/get?url=" + encodeURIComponent(url)
    );
    const html = response.data.contents;
    const parser = new DOMParser();
    const el = parser.parseFromString(html, "text/html");

    const { og_title, og_image, og_desc } = og_scraper(el);
    const og_sitename = new URL(url).hostname;
    const og_url_el = el.querySelector(`meta[property="og:url" ]`);
    const og_url = og_url_el ? og_url_el.content : url;

    let prep_time = "N/A";
    let servings = "N/A";
    let rating = "N/A";
    let ingredient_list = [];
    let instructions = [];

    //First whitelisted website geniuskitchen.com
    if (url.toLowerCase().includes("geniuskitchen")) {
      const prep_time_el = el.querySelector(`td.time`);
      const servings_el = el.querySelector(`span.count`);
      const rating_el = el.querySelector(`span[class="sr-only"]`);
      const ingredients_el = el.querySelectorAll("li[data-ingredient]");
      const instructions_el = el.querySelectorAll(`div.directions ol li`);

      prep_time = prep_time_el
        ? prep_time_el.textContent
            .replace(/[\n\r]+|[\s]{2,}/g, " ")
            .trim()
            .match(/\d+.+/g)[0]
        : "N/A";
      servings = servings_el ? servings_el.textContent : "N/A";
      rating =
        rating_el && rating_el.textContent.toLowerCase() !== "close"
          ? rating_el.textContent
          : "N/A";

      if (ingredients_el.length) {
        ingredients_el.forEach(i => {
          ingredient_list.push({
            quantity: convert_quantity(i.children[0].textContent.trim()),
            food: i.children[1].textContent.trim()
          });
        });
      }

      if (instructions_el.length) {
        instructions_el.forEach(i => {
          if (!i.firstElementChild) {
            instructions.push(i.textContent);
          }
        });
      }
    }

    //First whitelisted website allrecipes.com
    if (url.toLowerCase().includes("allrecipes")) {
      const prep_time_el = el.querySelector(`span[class="ready-in-time"]`);
      const servings_el = el.querySelector(`#metaRecipeServings`);
      const rating_el = el.querySelector(`meta[itemprop="ratingValue"]`);
      const ingredients_el = el.querySelectorAll(
        "span.recipe-ingred_txt.added:not(.white)"
      );
      const instructions_el = el.querySelectorAll(
        "span[class='recipe-directions__list--item'"
      );

      prep_time = prep_time_el ? prep_time_el.textContent : "N/A";
      servings = servings_el ? servings_el.content : "N/A";
      rating = rating_el ? rating_el.content : "N/A";

      if (ingredients_el.length) {
        ingredients_el.forEach(i => {
          if (i.textContent) {
            const find_quantity = i.textContent
              .trim()
              .match(/\d+(\/\d+)?(\s\d+\/\d+)?/);
            const quantity = find_quantity ? find_quantity[0].trim() : null;
            const food = i.textContent.replace(quantity, "").trim();
            const total_quantity = quantity ? quantity : "0";

            ingredient_list.push({
              quantity: convert_quantity(total_quantity),
              food
            });
          }
        });
      }

      if (instructions_el.length) {
        instructions_el.forEach(i => {
          if (i.textContent) {
            instructions.push(i.textContent.trim());
          }
        });
      }
    }

    return {
      og_sitename,
      og_title,
      og_image,
      og_desc,
      og_url,
      prep_time,
      servings,
      rating,
      ingredient_list,
      instructions
    };
  } catch (error) {
    return { error: error.message };
  }
};

export default scraper;
