const { createEpCode } = require("./supportFunctions");

test("create episode code with singular numbers", () => {
    expect(createEpCode({ season: 5, number: 2 })).toEqual("S05E02");
});

test("create episode code with two numbers", () => {
    expect(createEpCode({ season: 122, number: 1 })).toEqual("S122E01");
});

// function createEpCode(episode) {
//     let strSeason = episode.season.toString();

//     let strNumber = episode.number.toString();

//     let epCode =
//         "S" + strSeason.padStart(2, "0") + "E" + strNumber.padStart(2, "0");

//     return epCode; //S02E01
// }
