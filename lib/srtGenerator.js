const validate = jsonData => {
  /* TODO: Add logic to check if jsonData contains all the required attributes */
  return true;
};

const timestampAdd = (timestamp1, timestamp2) => {
  const timestamp1Obj = timestamp1.split(":");
  const timestamp2Obj = timestamp2.split(":");
  if (timestamp1Obj.length === timestamp2Obj.length) {
    const result = timestamp1Obj.map((ts, index) => {
      const outcome = parseInt(ts, 10) + parseInt(timestamp2Obj[index], 10);
      return outcome <= 9 ? "0" + outcome : outcome;
    });
    return result.join(":");
  } else {
    throw new Error("Timestamp values dont match");
  }
};

const generateUsingSeconds = (jsonData, startTime) => {
  if (validate(jsonData)) {
    let srt = "";
    let currentTime = startTime;

    jsonData = jsonData.map(data => {
      data.milliseconds = (data.seconds * 1000) % 1000;
      const totalSeconds = Math.floor(data.seconds);
      const totalMinutes = Math.floor(data.seconds / 60);
      data.seconds = totalSeconds % 60;
      data.hours = Math.floor(totalMinutes / 60);
      data.minutes = totalMinutes % 60;
      return data;
    });

    jsonData.forEach(
      ({ hours, minutes, seconds, milliseconds, content }, index) => {
        const start = currentTime;
        const end = timestampAdd(
          currentTime,
          `${hours}:${minutes}:${seconds}:${milliseconds}`
        );
        srt += `${index + 1}\n${start} --> ${end}\n${content}\n\n`;
        currentTime = end;
      }
    );

    return srt;
  } else {
    throw new Error(`Problem with your JSON data`);
  }
};

const generateUsingTimestamp = jsonData => {
  if (validate(jsonData)) {
    let srt = "";
    jsonData.forEach((data, index) => {
      srt += `${index + 1}\n${data.start} --> ${data.end}\n${data.content}\n\n`;
    });
    return srt;
  } else {
    throw new Error(`Problem with your JSON data`);
  }
};

exports.generate = (jsonData, formatType, startTime) => {
  if (formatType === "seconds") {
    return generateUsingSeconds(jsonData, startTime);
  } else if (formatType === "timestamp") {
    return generateUsingTimestamp(jsonData);
  } else {
    throw new Error(
      `Unknown format - ${format}, Acceptable values are "timestamp" and "seconds".`
    );
  }
};
