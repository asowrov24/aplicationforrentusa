import React, { useEffect, useState } from "react";
import Select from "react-select";
import countries from "i18n-iso-countries";

// Register English locale
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

const CountrySelect = ({ onChange, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const countryObj = countries.getNames("en", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([code, name]) => ({
      value: code,
      label: name,
    }));
    setOptions(countryArr);
  }, []);

  return (
    <Select
      className="text-black"
      placeholder="Select Country"
      options={options}
      value={options.find(option => option.value === value)}
      onChange={(selected) => onChange(selected?.value)}
    />
  );
};

export default CountrySelect;
