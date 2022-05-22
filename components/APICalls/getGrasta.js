import * as cheerio from "cheerio";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.last_nom > b.last_nom) {
    return 1;
  }
  return 0;
}

export default getGrasta = async () => {
  const getEachGrasta = async (input) => {
    let page = await fetch(
      `https://anothereden.miraheze.org/wiki/Grasta_${input}`,
      {
        method: "GET",
      }
    );
    let pageData = await page.text();
    const $ = cheerio.load(pageData);
    let attackTable = "";
    $("div")
      .find("tbody")
      .each((id, element) => {
        if (id == 0) {
          attackTable = $(element).find("tr");
        }
      });

    let attack = [];

    attackTable.each((id, element) => {
      let stats = [];
      let effect = "";
      let potential = "";
      let name = $(element).find($("td:nth-child(1)")).text();
      name = name.split("\n")[0];
      let statsRaw = $(element).find($("td:nth-child(2)")).text();
      let getHow = $(element).find($("td:nth-child(4)")).text();
      getHow = getHow.replace(/(\r\n|\n|\r)/gm, "");
      statsRaw.split(" ").forEach((item, i) => {
        switch (i) {
          case 0:
            stats.push(item);
            break;
          case 1:
            let copy = item;
            stats.push(copy.replace(/[^a-z]+/gi, ""));
            stats.push(parseInt(item.replace(/[^0-9]+/gi, "")));
            break;
          case 2:
            stats.push(parseInt(item.replace(/[^0-9]+/gi, "")));
            break;
          default:
            break;
        }
      });
      $(element)
        .find($("td:nth-child(3)"))
        .find("div")
        .each((id, element) => {
          if (id == 0) {
            effect = $(element).text();
          } else if (id == 1) {
            potential = $(element).text();
          }
        });
      if (effect == "") {
        effect = $(element).find($("td:nth-child(3)")).text();
      }
      const grasta = {
        effect: effect,
        getHow: getHow,
        name: name,
        potential: potential ? potential.split("Upgrade: ")[1] : "",
        stats: stats,
      };
      // If this is a VC grasta you get at the cat shrine, then don't push it into array
      if (input !== "VC" || getHow.indexOf("Cat Shrine") == -1) {
        if (name.indexOf("(Other weapons") !== -1) {
          let allGrasta = [
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
          ];
          allGrasta[0].name = name.replace("Other weapons", "Staff");
          allGrasta[1].name = name.replace("Other weapons", "Ax");
          allGrasta[2].name = name.replace("Other weapons", "Sword");
          allGrasta[3].name = name.replace("Other weapons", "Hammer");
          allGrasta[4].name = name.replace("Other weapons", "Fists");
          allGrasta[5].name = name.replace("Other weapons", "Katana");
          allGrasta[6].name = name.replace("Other weapons", "Bow");
          allGrasta[7].name = name.replace("Other weapons", "Lance");
          allGrasta.forEach((item) => {
            item.dupe = true;
            attack.push(item);
          });
          allGrasta.forEach((item) => attack.push(item));
        } else if (name.indexOf("(Weapon") !== -1) {
          let allGrasta = [
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
            { ...grasta },
          ];
          allGrasta[0].name = name.replace("(Weapon", "(Staff");
          allGrasta[1].name = name.replace("(Weapon", "(Ax");
          allGrasta[2].name = name.replace("(Weapon", "(Sword");
          allGrasta[3].name = name.replace("(Weapon", "(Hammer");
          allGrasta[4].name = name.replace("(Weapon", "(Fists");
          allGrasta[5].name = name.replace("(Weapon", "(Katana");
          allGrasta[6].name = name.replace("(Weapon", "(Bow");
          allGrasta[7].name = name.replace("(Weapon", "(Lance");
          allGrasta.forEach((item) => {
            item.dupe = true;
            attack.push(item);
          });
          allGrasta.forEach((item) => attack.push(item));
        } else attack.push(grasta);
      }
    });
    attack.sort(compare);
    for (let i = attack.length - 1; i >= 0; --i) {
      if (attack[i].name == "") attack.splice(i, 1);
      else if (
        attack[i].dupe &&
        attack.filter((e) => e.name === attack[i].name).length > 1
      ) {
        attack.splice(i, 1);
      }
    }
    return attack;
  };
  console.log("called");
  const attack = await getEachGrasta("Attack");
  const life = await getEachGrasta("Life");
  const support = await getEachGrasta("Support");
  const specialRaw = await getEachGrasta("Special");
  const VC = await getEachGrasta("VC");
  const special = specialRaw.concat(VC);

  await firebase
    .database()
    .ref("grasta/grasta")
    .set({ attack, life, support, special });
};
