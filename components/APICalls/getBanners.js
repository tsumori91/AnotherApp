import * as cheerio from "cheerio";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default getBanners = async (oldBanners) => {
  let page = await fetch(
    "https://anothereden.miraheze.org/wiki/Gallery_of_Dreams",
    {
      method: "GET",
    }
  );
  let pageData = await page.text();
  const $ = cheerio.load(pageData);
  const bannerListRaw = $('[title="Limited Encounters"]').find("tr");
  const bannerList = [];
  bannerListRaw.each((id, element) => {
    const link = $(element).find($("a")).attr("href");
    const freePaid = $(element).find($("td:nth-child(1)")).text();
    if (freePaid.indexOf("Paid") == -1 && freePaid.indexOf("Free") == -1) {
      link ? bannerList.push(`https://anothereden.miraheze.org${link}`) : null;
    }
  });

  if (!bannerList.length) {
    return;
  }
  const newBanners = [];
  for (const banner of bannerList) {
    let page = await fetch(banner, {
      method: "GET",
    });
    let pageData = await page.text();
    const $ = cheerio.load(pageData);
    const bannerRateUpCharsRaw = $("#mw-content-text > div >").find("div");
    const bannerRatesRaw = $(" div > table > tbody").find("tr");
    const bannerCharsRaw = [];

    const getBannerChars = () => {
      const bannerRateUpChars = [];
      $(bannerRateUpCharsRaw).each((id, element) => {
        const charName = $(element).find($("a")).attr("title");
        bannerRateUpChars.push(charName);
      });
      bannerRateUpChars.forEach((char, i, obj) => {
        obj[i] = char
          .replace(" (Another Style)", "(AS)")
          .replace(" (Extra Style)", "(ES)");
      });
      const bannerChars = [...new Set(bannerRateUpChars)];
      return bannerChars;
    };
    const getBannerImage = () => {
      try {
        return $("#mw-content-text > div > p > a > img").attr("src");
      } catch (error) {
        return "";
      }
    };

    const bannerCharacters = getBannerChars();
    const AsRates = 0.02;
    const bannerImage = { uri: getBannerImage() };
    const rates = [0, 0, 0, 0, 0, 0, 0, 0];
    const bannerFiveRates = [];
    const bannerFourFRates = [];
    const charactersAs = [];
    const charactersFive = [];

    bannerRatesRaw.each((id, element) => {
      const name = $(element).find($("th")).text().replace("\n", "");
      const threeStarRate = $(element).find($("td:nth-child(2)")).text();
      const fourStarRate = $(element).find($("td:nth-child(3)")).text();
      const fiveStarRate = $(element).find($("td:nth-child(4)")).text();
      const fourStarRateTen = $(element).find($("td:nth-child(5)")).text();
      const fiveStarRateTen = $(element).find($("td:nth-child(6)")).text();
      if (bannerCharacters.filter((item) => item == name).length) {
        bannerFiveRates.push(fiveStarRate);
        bannerFourFRates.push(fourStarRate);
      }
      if (id > 4 && threeStarRate.indexOf("%") == -1) {
        bannerCharsRaw.push(name);
      } else if (id == 2) {
        rates[3] = fourStarRate;
        rates[4] = fiveStarRate;
        rates[6] = fourStarRateTen;
        rates[7] = fiveStarRateTen;
      } else if (id == 3) {
        rates[1] = threeStarRate;
        rates[2] = fourStarRate;
        rates[5] = fourStarRateTen;
      } else if (id == 4) {
        rates[0] = threeStarRate;
      }
    });
    rates.forEach((item, i, arr) => {
      if (parseFloat(item)) arr[i] = parseFloat(item);
      else arr[i] = 0;
    });
    bannerFiveRates.forEach((item, i, arr) => {
      if (parseFloat(item)) arr[i] = parseFloat(item);
      else arr[i] = 0;
    });
    bannerFourFRates.forEach((item, i, arr) => {
      if (parseFloat(item)) arr[i] = parseFloat(item);
      else arr[i] = 0;
    });
    bannerCharsRaw.forEach((item) => {
      if (item.indexOf("(AS)") !== -1 || item.indexOf("(ES)") !== -1)
        charactersAs.push(item);
      else charactersFive.push(item);
    });
    charactersAs.forEach((item, i, arr) => {
      if (bannerCharacters.filter((e) => e == item).length) arr.splice(i, 1);
    });
    charactersFive.forEach((item, i, arr) => {
      if (bannerCharacters.filter((e) => e == item).length) arr.splice(i, 1);
    });
    const thisCompleteBanner = {
      AsRates,
      bannerCharacters,
      bannerFiveRates,
      bannerFourFRates,
      bannerImage,
      charactersAs: charactersAs[0] ? charactersAs : [""],
      charactersFive,
      rates,
    };
    newBanners.push(thisCompleteBanner);
  }
  const allBanners = oldBanners.concat(newBanners);
  allBanners.forEach((e, i, a) => {
    if (e == undefined) {
      a.splice(i, 1);
      return;
    }
  });
  const banners1 = [...new Set(allBanners)];
  banners1.forEach((e, i, a) => {
    if (e == undefined) {
      a.splice(i, 1);
      return;
    }
    a[i].key = i + 1;
  });
  const banners = banners1.filter(
    (item, index, arr) =>
      arr.findIndex((v) =>
        // Check one character banner array for others at the same position, if they match
        v.bannerCharacters.every((val, i) => val === item.bannerCharacters[i])
      ) === index
  );
  await firebase.database().ref("banners").set({ banners });
};
