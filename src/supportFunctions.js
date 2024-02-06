// using .map() to generate new array of GOT episode objects
//
// function addEpCodeToAll(inputArray) {
//     let modifiedArray = inputArray.map((episode) => {
//         const stringSeason = episode.season.toString().padStart(2, "0");
//         const stringNumber = episode.number.toString().padStart(2, "0");
//         const epCode = S${stringSeason}E${stringNumber};
//         let decoratedEpisodeObject = { ...episode, epCode };
//         return decoratedEpisodeObject;
//     });
//     return modifiedArray;
// }

//const { resolveInclude } = require("ejs");

function generateNewEpisodeArray(inputArray) {
    const episodeArray = [...inputArray]; // clones the array of episode objects

    for (let episode of episodeArray) {
        // accessing the singular episode object in the array
        episode.epCode = createEpCode(episode); //this line creates a new value to pair with new episode code key
        episode.neatSummary = removePTags(episode); //this line creates a new value to pair with new summary key
    }

    return episodeArray;
}

function removePTags(episode) {
    const newSummary = episode.summary.replace(/<\/?p>/gi, "");
    return newSummary;
}

function createEpCode(episode) {
    let strSeason = episode.season.toString();
    let strNumber = episode.number.toString();

    let epCode =
        "S" + strSeason.padStart(2, "0") + "E" + strNumber.padStart(2, "0");

    return epCode; //expected example: S02E01
}

function findIndividualEpisode(searchTerm, arrayOfObjects) {
    let numTerm = parseInt(searchTerm);
    let individualEpisode = arrayOfObjects.find(
        (object) => object.id === numTerm,
    );
    return individualEpisode;
}

function filterEpisodeArrayWithSearch(searchTerm, arrayOfObjects) {
    let lowerSearchTerm = searchTerm.toLowerCase();

    let resultArray = arrayOfObjects.filter((object) => {
        return (
            object.name.toLowerCase().includes(lowerSearchTerm) ||
            object.neatSummary.toLowerCase().includes(lowerSearchTerm)
        );
    });

    return resultArray;
}

function extractFavouriteEpId(EpisodeObjectArray) {
    let resultArray = EpisodeObjectArray.map((object) => object["episode_id"]);
    return resultArray;
}

function filterOutFavourites(ArrayOfFavEpObj, ArrayOfEpisodeObjects) {
    let resultObjArray = [];
    let filteredFavouritesArray = extractFavouriteEpId(ArrayOfFavEpObj); //e.g. [{123, 456}] becomes [123, 456]
    filteredFavouritesArray.forEach((element) => {
        for (let episodeObj of ArrayOfEpisodeObjects) {
            if (element === episodeObj.id) {
                resultObjArray.push(episodeObj);
            }
        }
    });
    return resultObjArray;
}

module.exports = {
    generateNewEpisodeArray,
    findIndividualEpisode,
    createEpCode,
    filterEpisodeArrayWithSearch,
    extractFavouriteEpId,
    filterOutFavourites,
};
