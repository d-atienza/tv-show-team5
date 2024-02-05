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
    let resultArray = [];
    //use .includes to verify each object against search term, if true then push to result array. Return result array. Update app code to send result array instead.
}

module.exports = {
    generateNewEpisodeArray,
    findIndividualEpisode,
    createEpCode,
    filterEpisodeArrayWithSearch,
};

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
