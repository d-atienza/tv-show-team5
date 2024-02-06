const {
    createEpCode,
    findIndividualEpisode,
    filterEpisodeArrayWithSearch,
    extractFavouriteEpId,
    filterOutFavourites,
} = require("./supportFunctions");

//////////Tests for createEpCode function
// test("create episode code with singular numbers", () => {
//     expect(createEpCode({ season: 5, number: 2 })).toEqual("S05E02");
// });

// test("create episode code with two numbers", () => {
//     expect(createEpCode({ season: 122, number: 1 })).toEqual("S122E01");
// });

///////Tests for findIndividualEpisode

// test("finds an individual episode from an array of objects using the ID. Converts strings to numbers in this function to complete this. ", () => {
//     let objectsArray = [
//         { id: 123, name: "Object 1" },
//         { id: 456, name: "Object 2" },
//         { id: 789, name: "Object 3" },
//         { id: 101, name: "Object 4" },
//     ];
//     expect(findIndividualEpisode("123", objectsArray)).toEqual({
//         id: 123,
//         name: "Object 1",
//     });
// });

// test("finds an individual episode from an array of objects using the ID. Converts strings to numbers in this function to complete this. ", () => {
//     let objectsArray = [
//         { id: 123, name: "Object 1" },
//         { id: 456, name: "Object 2" },
//         { id: 789, name: "Object 3" },
//         { id: 101, name: "Object 4" },
//     ];
//     expect(findIndividualEpisode("720", objectsArray)).toEqual(undefined);
// });

///////Tests for filterEpisodeArrayWithSearch
// test("finds episodes from an array of objects using search term. Converts strings to lowercase in this function to complete this. ", () => {
//     let objectsArray = [
//         {
//             id: 123,
//             name: "Object 1",
//             neatSummary: "The quick brown fox jumps over the lazy dog",
//         },
//         {
//             id: 456,
//             name: "Object 2",
//             neatSummary: "A quick brown dog jumps over the lazy fox",
//         },
//         {
//             id: 789,
//             name: "Object 3",
//             neatSummary: "Lazy dogs and quick foxes are jumping together",
//         },
//         { id: 101, name: "Object 4", neatSummary: "apple banana mango carrot" },
//     ];
//     expect(filterEpisodeArrayWithSearch("Lazy", objectsArray)).toEqual([
//         {
//             id: 123,
//             name: "Object 1",
//             neatSummary: "The quick brown fox jumps over the lazy dog",
//         },
//         {
//             id: 456,
//             name: "Object 2",
//             neatSummary: "A quick brown dog jumps over the lazy fox",
//         },
//         {
//             id: 789,
//             name: "Object 3",
//             neatSummary: "Lazy dogs and quick foxes are jumping together",
//         },
//     ]);
// });

// test("use search term that doesn't match anything in existing objects, should return empty array", () => {
//     let objectsArray = [
//         {
//             id: 123,
//             name: "Object 1",
//             neatSummary: "The quick brown fox jumps over the lazy dog",
//         },
//         {
//             id: 456,
//             name: "Object 2",
//             neatSummary: "A quick brown dog jumps over the lazy fox",
//         },
//         {
//             id: 789,
//             name: "Object 3",
//             neatSummary: "Lazy dogs and quick foxes are jumping together",
//         },
//         { id: 101, name: "Object 4", neatSummary: "apple banana mango carrot" },
//     ];
//     expect(filterEpisodeArrayWithSearch("1227", objectsArray)).toEqual([]);
// });

// let objectsArray = [
//     { id: 123, name: "Object 1" },
//     { id: 456, name: "Object 2" },
//     { id: 789, name: "Object 3" },
//     { id: 101, name: "Object 4" },
// ];

// test("extract id numbers into an array from an array of objects", () => {
//     let objectsArray = [
//         { episode_id: 123, name: "Object 1" },
//         { episode_id: 456, name: "Object 2" },
//         { episode_id: 789, name: "Object 3" },
//         { episode_id: 101, name: "Object 4" },
//     ];
//     expect(extractFavouriteEpId(objectsArray)).toEqual([123, 456, 789, 101]);
// });

test("Returns full details on episodes which match id's from the favourites array", () => {
    let objectsArray = [
        { id: 4952, name: "Object 1" },
        { id: 456, name: "Object 2" },
        { id: 789, name: "Object 3" },
        { id: 144328, name: "Object 4" },
    ];
    let favouritesArray = [
        { episode_id: 4952 },
        { episode_id: 4965 },
        { episode_id: 4954 },
        { episode_id: 144328 },
        { episode_id: 4970 },
    ];
    expect(filterOutFavourites(favouritesArray, objectsArray)).toEqual([
        { id: 4952, name: "Object 1" },
        { id: 144328, name: "Object 4" },
    ]);
});
