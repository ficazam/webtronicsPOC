export const weathercodeConverter = (weathercode: number) => {
  let result;
  switch (weathercode) {
    case 0:
      result = "Clear skies";
      break;
    case 1:
      result = "Mainly clear";
      break;
    case 2:
      result = "Partly cloudy";
      break;
    case 3:
      result = "Overcast";
      break;
    case 45:
      result = "Fog";
      break;
    case 48:
      result = "Depositing rime fog";
      break;
    case 51:
      result = "Light Drizzle";
      break;
    case 53:
      result = "Moderate Drizzle";
      break;
    case 55:
      result = "Dense Drizzle";
      break;
    case 56:
      result = "Light Freezing Drizzle";
      break;
    case 57:
      result = "Dense Freezing Drizzle";
      break;
    case 61:
      result = "Slight Rain";
      break;
    case 63:
      result = "Moderate Rain";
      break;
    case 65:
      result = "Heavy Rain";
      break;
    case 66:
      result = "Light Freezing Rain";
      break;
    case 67:
      result = "Heavy Freezing Rain";
      break;
    case 71:
      result = "Slight Snowfall";
      break;
    case 73:
      result = "Moderate Snowfall";
      break;
    case 75:
      result = "Heavy Snowfall";
      break;
    case 77:
      result = "Snow grains";
      break;
    case 80:
      result = "Slight Rain Showers";
      break;
    case 81:
      result = "Moderate Rain Showers";
      break;
    case 82:
      result = "Violent Rain Showers";
      break;
    case 85:
      result = "Slight Snow Showers";
      break;

    case 86:
      result = "Heavy Snow Showers";
      break;
    default:
      result = "";
      break;
  }

  return result;
};
