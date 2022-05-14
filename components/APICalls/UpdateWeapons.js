import * as cheerio from "cheerio";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default updateWeapons = async (input, equipmentType) => {
  if (!input) return;
  let weaponsList = input;
  let i = 0;
  for (const weapon of weaponsList) {
    i++;
    const scrapeData = async () => {
      let weaponPage = await fetch(weapon.source, {
        method: "GET",
      });
      let pageData = await weaponPage.text();
      const $ = cheerio.load(pageData);
      let matsTable = false;
      let upgradeTable = false;
      let weaponMats = [];
      let enhanceMats = [
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
        { location: { mats: [], name: "" } },
      ];
      let upgradeMatsRaw = [];
      const materials = [];
      let materialsLocation = "";
      let materialsLocation2 = false;
      let materialsLocation3 = false;
      $("table.anotherTable")
        .find("tbody")
        .each((id, element) => {
          if (id == 1) matsTable = $(element);
          else if (id == 2) upgradeTable = $(element);
        });
      $(matsTable)
        .find("tr")
        .each((id, element) => {
          let location = $(element).find($("td:nth-child(3)")).text();
          let name = $(element)
            .find($("td:nth-child(1)"))
            .text()
            .split("\n")[0];
          let number = $(element)
            .find($("td:nth-child(2)"))
            .text()
            .split("\n")[0];
          let getFrom = $(element).find($("td:nth-child(4)")).text();
          if (getFrom.indexOf("Horror") !== -1) getFrom = " (Horror)";
          else if (getFrom.indexOf("Sparkles") !== -1)
            getFrom = " (Sparkles/Chest)";
          else if (getFrom.indexOf("Boss") !== -1) getFrom = " (Boss)";
          else if (getFrom.indexOf("Fishing Enemy") !== -1)
            getFrom = " (Fishing Enemy)";
          else getFrom = "";

          if (name)
            weaponMats.push({
              name: name + getFrom + ` (${number})`,
              location: location.split("\n")[0],
            });
        });
      const loc1 = weaponMats[0].location;
      const loc2 = weaponMats[1].location;
      const loc3 = weaponMats[2] ? weaponMats[2].location : false;
      if (loc1 == loc2 && loc2 == loc3) {
        weaponMats.forEach((item) => materials.push(item.name));
        materialsLocation = loc1;
      } else if (loc1 == loc2) {
        if (loc3) {
          weaponMats.forEach((item) => materials.push(item.name));
          materialsLocation = loc1;
          materialsLocation2 = loc3;
        } else {
          materials.push(weaponMats[0].name);
          materials.push("");
          materials.push(weaponMats[1].name);
          materialsLocation = loc1;
        }
      } else if (loc1 == loc3) {
        materials.push(weaponMats[0].name);
        materials.push(weaponMats[2].name);
        materials.push(weaponMats[1].name);
        materialsLocation = loc1;
        materialsLocation2 = loc2;
      } else if (loc2 == loc3) {
        materials.push(weaponMats[1].name);
        materials.push(weaponMats[2].name);
        materials.push(weaponMats[0].name);
        materialsLocation2 = loc1;
        materialsLocation = loc2;
      } else {
        if (loc3) {
          weaponMats.forEach((item) => materials.push(item.name));
          materialsLocation = loc1;
          materialsLocation2 = loc2;
          materialsLocation3 = loc3;
        } else {
          materials.push(weaponMats[0].name);
          materials.push("");
          materials.push(weaponMats[1].name);
          materialsLocation = loc1;
          materialsLocation2 = loc2;
        }
      }
      if (upgradeTable) {
        upgradeTable.find("tr").each((id, element) => {
          if (id > 3) upgradeMatsRaw.push($(element));
        });
        upgradeMatsRaw.forEach((row, i) => {
          const location = $(row)
            .find($("td:nth-child(12)"))
            .text()
            .split("\n")[0];
          const matNameRaw = $(row)
            .find($("td:nth-child(1)"))
            .text()
            .split("\n")[0];
          if (matNameRaw[0] == " " && matNameRaw.indexOf("Git") !== -1) return;
          let dropFrom = $(row).find($("td:nth-child(13)")).text();
          if (dropFrom.indexOf("Sparkles") !== -1) {
            dropFrom = " (Sparkles/Chest)";
          } else if (dropFrom.indexOf("(Horror") !== -1) {
            dropFrom = " (Horror)";
          } else if (dropFrom.indexOf("(Boss") !== -1) {
            dropFrom = " (Boss)";
          } else if (dropFrom.indexOf("(Shiny") !== -1) {
            dropFrom = " (Shiny)";
          } else dropFrom = "";
          const matName = matNameRaw + dropFrom;
          const firstCol = $(row).find($("td:nth-child(2)")).text();
          const secondCol = $(row).find($("td:nth-child(3)")).text();
          const thirdCol = $(row).find($("td:nth-child(4)")).text();
          const fourthCol = $(row).find($("td:nth-child(5)")).text();
          const fifthCol = $(row).find($("td:nth-child(6)")).text();
          const sixthCol = $(row).find($("td:nth-child(7)")).text();
          const seventhCol = $(row).find($("td:nth-child(8)")).text();
          const eighthCol = $(row).find($("td:nth-child(9)")).text();
          const ninthCol = $(row).find($("td:nth-child(10)")).text();
          const tenthCol = $(row).find($("td:nth-child(11)")).text();
          if (firstCol[0] !== "-") {
            const material = `${matName} (${firstCol.split("\n")[0]})`;
            let locationName = enhanceMats[0].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[0].location.mats.push(material);
              enhanceMats[0].location.name = location;
            } else if (!enhanceMats[0].location2) {
              enhanceMats[0].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[0].location2.name === location) {
              enhanceMats[0].location2.mats.push(material);
            } else if (!enhanceMats[0].location3) {
              enhanceMats[0].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[0].location3.name === location) {
              enhanceMats[0].location3.mats.push(material);
            } else if (!enhanceMats[0].location4) {
              enhanceMats[0].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[0].location4.name === location) {
              enhanceMats[0].location4.mats.push(material);
            }
          }
          if (secondCol[0] !== "-") {
            const material = `${matName} (${secondCol.split("\n")[0]})`;
            let locationName = enhanceMats[1].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[1].location.mats.push(material);
              enhanceMats[1].location.name = location;
            } else if (!enhanceMats[1].location2) {
              enhanceMats[1].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[1].location2.name === location) {
              enhanceMats[1].location2.mats.push(material);
            } else if (!enhanceMats[1].location3) {
              enhanceMats[1].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[1].location3.name === location) {
              enhanceMats[1].location3.mats.push(material);
            } else if (!enhanceMats[1].location4) {
              enhanceMats[1].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[1].location4.name === location) {
              enhanceMats[1].location4.mats.push(material);
            }
          }
          if (thirdCol[0] !== "-") {
            const material = `${matName} (${thirdCol.split("\n")[0]})`;
            let locationName = enhanceMats[2].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[2].location.mats.push(material);
              enhanceMats[2].location.name = location;
            } else if (!enhanceMats[2].location2) {
              enhanceMats[2].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[2].location2.name === location) {
              enhanceMats[2].location2.mats.push(material);
            } else if (!enhanceMats[2].location3) {
              enhanceMats[2].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[2].location3.name === location) {
              enhanceMats[2].location3.mats.push(material);
            } else if (!enhanceMats[2].location4) {
              enhanceMats[2].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[2].location4.name === location) {
              enhanceMats[2].location4.mats.push(material);
            }
          }
          if (fourthCol[0] !== "-") {
            const material = `${matName} (${fourthCol.split("\n")[0]})`;
            let locationName = enhanceMats[3].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[3].location.mats.push(material);
              enhanceMats[3].location.name = location;
            } else if (!enhanceMats[3].location2) {
              enhanceMats[3].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[3].location2.name === location) {
              enhanceMats[3].location2.mats.push(material);
            } else if (!enhanceMats[3].location3) {
              enhanceMats[3].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[3].location3.name === location) {
              enhanceMats[3].location3.mats.push(material);
            } else if (!enhanceMats[3].location4) {
              enhanceMats[3].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[3].location4.name === location) {
              enhanceMats[3].location4.mats.push(material);
            }
          }
          if (fifthCol[0] !== "-") {
            const material = `${matName} (${fifthCol.split("\n")[0]})`;
            let locationName = enhanceMats[4].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[4].location.mats.push(material);
              enhanceMats[4].location.name = location;
            } else if (!enhanceMats[4].location2) {
              enhanceMats[4].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[4].location2.name === location) {
              enhanceMats[4].location2.mats.push(material);
            } else if (!enhanceMats[4].location3) {
              enhanceMats[4].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[4].location3.name === location) {
              enhanceMats[4].location3.mats.push(material);
            } else if (!enhanceMats[4].location4) {
              enhanceMats[4].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[4].location4.name === location) {
              enhanceMats[4].location4.mats.push(material);
            }
          }
          if (sixthCol[0] !== "-") {
            const material = `${matName} (${sixthCol.split("\n")[0]})`;
            let locationName = enhanceMats[5].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[5].location.mats.push(material);
              enhanceMats[5].location.name = location;
            } else if (!enhanceMats[5].location2) {
              enhanceMats[5].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[5].location2.name === location) {
              enhanceMats[5].location2.mats.push(material);
            } else if (!enhanceMats[5].location3) {
              enhanceMats[5].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[5].location3.name === location) {
              enhanceMats[5].location3.mats.push(material);
            } else if (!enhanceMats[5].location4) {
              enhanceMats[5].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[5].location4.name === location) {
              enhanceMats[5].location4.mats.push(material);
            }
          }
          if (seventhCol[0] !== "-") {
            const material = `${matName} (${seventhCol.split("\n")[0]})`;
            let locationName = enhanceMats[6].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[6].location.mats.push(material);
              enhanceMats[6].location.name = location;
            } else if (!enhanceMats[6].location2) {
              enhanceMats[6].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[6].location2.name === location) {
              enhanceMats[6].location2.mats.push(material);
            } else if (!enhanceMats[6].location3) {
              enhanceMats[6].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[6].location3.name === location) {
              enhanceMats[6].location3.mats.push(material);
            } else if (!enhanceMats[6].location4) {
              enhanceMats[6].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[6].location4.name === location) {
              enhanceMats[6].location4.mats.push(material);
            }
          }
          if (eighthCol[0] !== "-") {
            const material = `${matName} (${eighthCol.split("\n")[0]})`;
            let locationName = enhanceMats[7].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[7].location.mats.push(material);
              enhanceMats[7].location.name = location;
            } else if (!enhanceMats[7].location2) {
              enhanceMats[7].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[7].location2.name === location) {
              enhanceMats[7].location2.mats.push(material);
            } else if (!enhanceMats[7].location3) {
              enhanceMats[7].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[7].location3.name === location) {
              enhanceMats[7].location3.mats.push(material);
            } else if (!enhanceMats[7].location4) {
              enhanceMats[7].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[7].location4.name === location) {
              enhanceMats[7].location4.mats.push(material);
            }
          }
          if (ninthCol[0] !== "-") {
            const material = `${matName} (${ninthCol.split("\n")[0]})`;
            let locationName = enhanceMats[8].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[8].location.mats.push(material);
              enhanceMats[8].location.name = location;
            } else if (!enhanceMats[8].location2) {
              enhanceMats[8].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[8].location2.name === location) {
              enhanceMats[8].location2.mats.push(material);
            } else if (!enhanceMats[8].location3) {
              enhanceMats[8].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[8].location3.name === location) {
              enhanceMats[8].location3.mats.push(material);
            } else if (!enhanceMats[8].location4) {
              enhanceMats[8].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[8].location4.name === location) {
              enhanceMats[8].location4.mats.push(material);
            }
          }
          if (tenthCol[0] !== "-") {
            const material = `${matName} (${tenthCol.split("\n")[0]})`;
            let locationName = enhanceMats[9].location.name;
            if (locationName === "" || locationName === location) {
              enhanceMats[9].location.mats.push(material);
              enhanceMats[9].location.name = location;
            } else if (!enhanceMats[9].location2) {
              enhanceMats[9].location2 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[9].location2.name === location) {
              enhanceMats[9].location2.mats.push(material);
            } else if (!enhanceMats[9].location3) {
              enhanceMats[9].location3 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[9].location3.name === location) {
              enhanceMats[9].location3.mats.push(material);
            } else if (!enhanceMats[9].location4) {
              enhanceMats[9].location4 = {
                mats: [material],
                name: location,
              };
            } else if (enhanceMats[9].location4.name === location) {
              enhanceMats[9].location4.mats.push(material);
            }
          }
        });
      }
      weapon.materials = materials;
      weapon.materialsLocation = materialsLocation;
      weapon.materialsLocation2 = materialsLocation2;
      weapon.materialsLocation3 = materialsLocation3;
      weapon.enhanceMats = enhanceMats;
    };
    console.log(i);
    if (weapon.craft)
      try {
        await scrapeData();
      } catch (error) {
        console.log(error);
      }
  }
  switch (equipmentType) {
    case "weapon":
      await firebase.database().ref("weapons").set({ weapons: weaponsList });

      break;
    case "armor":
      await firebase.database().ref("armor").set({ armor: weaponsList });

      break;
    default:
      break;
  }
};
