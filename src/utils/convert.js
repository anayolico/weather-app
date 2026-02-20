export const cToF = (c) => (c * 9) / 5 + 32;
export const fToC = (f) => ((f - 32) * 5) / 9;

export const convertWeatherData = (data, toUnit) => {
  if (!data) return data;
  const convert = toUnit === 'metric' ? fToC : cToF;
  const cloned = JSON.parse(JSON.stringify(data));
  if (cloned.main) {
    cloned.main.temp = convert(cloned.main.temp);
    cloned.main.feels_like = convert(cloned.main.feels_like);
  }
  if (cloned.wind) {
    if (toUnit === 'imperial') {
      // m/s to mph
      cloned.wind.speed = cloned.wind.speed * 2.237;
    } else {
      cloned.wind.speed = cloned.wind.speed / 2.237;
    }
  }
  // forecast conversion happens separately in hook or when toggling
  return cloned;
};
