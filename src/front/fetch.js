const url = "http://localhost:5000/builds"

async function fetchBuilds() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let data = collectData();
    var raw = JSON.stringify(data);
    
    var requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => handleResults(result, data))
      .catch(error => console.log('error', error));

    // console.log(response);
}

function collectData() {
    let engravings = [];
    if (document.getElementById("engraving-1").value.trim() != "") {
        engravings.push(handleShorthandEngravingNames(document.getElementById("engraving-1").value.trim()));
    }
    if ( document.getElementById("engraving-2").value != "") {
        engravings.push(handleShorthandEngravingNames(document.getElementById("engraving-2").value.trim()));
    }

    let stats = [];
    if (document.getElementById("stat-1").value != "") {
        stats.push(handleShorthandStatNames(document.getElementById("stat-1").value.trim()));
    }
    if (document.getElementById("stat-2").value != "") {
        stats.push(handleShorthandStatNames(document.getElementById("stat-2").value.trim()));
    }
    
    return {
        "engravings": engravings,
        "stats": stats
    }
}

function handleShorthandStatNames(stat_name) {
    if (stat_name.toLowerCase() === "specialisation" || stat_name.toLowerCase() === "specialization" | stat_name.toLowerCase() === "spe") {
        return "Spec";
    }

    if (stat_name.toLowerCase() == "swift") {
        return "Swiftness";
    }
    return stat_name;
}

function handleShorthandEngravingNames(engraving_name) {
    let res = engraving_name;
    switch (engraving_name.toLowerCase()) {
        case "kbw":
        case "arme affutée":
            res = "Keen Blunt Weapon";
            break;
        
        case "ba":
            res = "Blessed Aura";
            break;

        case "cd":
        case "poupée maudite":
            res = "Cursed Doll";
            break;
        
        case "adre":
            res = "Adrenaline";
            break;

        case "hm":
            res = "Hit Master";
            break;

        case "am":
            res = "Ambush Master";
            break;

        case "rc":
            res = "Raid Captain";
            break;

        case "ep":
            res = "Ether Predator";
            break;

        case "mi":
            res = "Mass Increase";
            break;

        case "sc":
            res = "Super Charge";
            break;
    }
    return res;
}

function handleResults(builds, data) {
    let html = "";
    const engravingMap = new Map();
    if (builds.length == 0) {
        html = "No build for this combination of stat/engraving";
    } else {
        html = "<div class='build-container'>\n";
        let i = 0;
        for (let build of builds) {
            i++;
            let isSubstatOnly = isOnlySubstat(build, data.stats);
            let metaEngravings = isMetaEngravingsOnly(build, data.engravings);
            let statsPart = [];
            for (stat of build.stats) {
                statsPart.push(`<span class="stat"><span class="stat-name">${stat.name}</span> <span class="stat-importance">${stat.importance}</span></span>`);
            }
            engravingMap.set(i, `<div class="meta-engraving-list">Meta : ${buildMetaEngravingList(build.engravings)}</div><div class="off-meta-engraving-list">Off-meta : ${buildOffMetaEngravingList(build.engravings)}</div>`);
            html += `<div id='build-${i}' class='build${isSubstatOnly ? " substat-only" : ""}${metaEngravings ? " meta-engravings" : ""}'><span class="build-name">${build.name}</span> (${statsPart.join(", ")})</div>\n`;
        }
        html += "</div>";
    }
    document.getElementById("results").innerHTML = "<h4>Results : </h4>" + html;
    for (let [id, tooltipContent] of engravingMap) {
        tippy(`#build-${id} .build-name`, {
            content: tooltipContent,
            allowHTML: true,
            maxWidth: 'none'
        });
    }
    
}

function isOnlySubstat(build, stats_wanted) {
    if (stats_wanted.length == 0) {
        return false;
    }
    let stat_wanted = stats_wanted[0];
    for (let stat of build.stats) {
        if (stat.name.toLowerCase() === stat_wanted.toLowerCase()) {
            if (stat.importance == "sub") {
                return true;
            } else {
                return false;
            }
        }
    }
}

function isMetaEngravingsOnly(build, engravings_wanted) {
    if (engravings_wanted.length == 0) {
        // Basically you're just trying to sell stats so we default to true
        return true;
    }

    res = true;
    for (let engraving_wanted of engravings_wanted) {
        res = res && isMetaEngravingForBuild(build, engraving_wanted);
    }
    return res;
}

function isMetaEngravingForBuild(build, engraving_wanted) {
    for (let engraving of build.engravings) {
        if (engraving.name.toLowerCase() === engraving_wanted.toLowerCase()) {
            if (engraving.importance === "meta") {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

function buildMetaEngravingList(engravings) {
    return buildEngravingList(engravings, "meta");
}

function buildOffMetaEngravingList(engravings) {
    return buildEngravingList(engravings, "off-meta");
}

function buildEngravingList(engravings, importance) {
    let engravingsToKeep = [];
    for(let engraving of engravings) {
        if (engraving.importance === importance) {
            engravingsToKeep.push(`<span class="engraving">${engraving.name}</span>`);
        }
    }

    return engravingsToKeep.join(", ");
}