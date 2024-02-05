const { createEpCode, findIndividualEpisode } = require("./supportFunctions");

// //////////Tests for createEpCode function
// test("create episode code with singular numbers", () => {
//     expect(createEpCode({ season: 5, number: 2 })).toEqual("S05E02");
// });

// test("create episode code with two numbers", () => {
//     expect(createEpCode({ season: 122, number: 1 })).toEqual("S122E01");
// });

///////Tests for findIndividualEpisode

test("finds an individual episode from an array of objects using the ID. Converts strings to numbers in this function to complete this. ", () => {
    let objectsArray = [
        { id: 123, name: "Object 1" },
        { id: 456, name: "Object 2" },
        { id: 789, name: "Object 3" },
        { id: 101, name: "Object 4" },
    ];
    expect(findIndividualEpisode("123", objectsArray)).toEqual({
        id: 123,
        name: "Object 1",
    });
});

test("finds an individual episode from an array of objects using the ID. Converts strings to numbers in this function to complete this. ", () => {
    let objectsArray = [
        { id: 123, name: "Object 1" },
        { id: 456, name: "Object 2" },
        { id: 789, name: "Object 3" },
        { id: 101, name: "Object 4" },
    ];
    expect(findIndividualEpisode("720", objectsArray)).toEqual(undefined);
});

// function findIndividualEpisode(searchTerm, arrayOfObjects) {
//     let numTerm = parseInt(searchTerm);
//     let individualEpisode = arrayOfObjects.find(
//         (object) => object.id === searchTerm,
//     );
//     return individualEpisode;
// }
