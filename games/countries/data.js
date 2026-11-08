// The 193 UN member countries. Line order = card order, and saved progress is stored by
// position, so add new countries at the end.
// Format per line: Name|continent|capital|alias,alias
// Aliases are other names people use; each must fit one country only (so not "Korea" or "Guinea").
const RAW = `
Algeria|Africa|Algiers
Angola|Africa|Luanda
Benin|Africa|Porto-Novo
Botswana|Africa|Gaborone
Burkina Faso|Africa|Ouagadougou
Burundi|Africa|Gitega
Cameroon|Africa|Yaoundé
Cape Verde|Africa|Praia|Cabo Verde
Central African Republic|Africa|Bangui
Chad|Africa|N'Djamena
Comoros|Africa|Moroni
Congo|Africa|Brazzaville|Republic of the Congo
DR Congo|Africa|Kinshasa|Democratic Republic of the Congo
Djibouti|Africa|Djibouti
Egypt|Africa|Cairo
Equatorial Guinea|Africa|Malabo
Eritrea|Africa|Asmara
Eswatini|Africa|Mbabane|Swaziland
Ethiopia|Africa|Addis Ababa
Gabon|Africa|Libreville
Gambia|Africa|Banjul|The Gambia
Ghana|Africa|Accra
Guinea|Africa|Conakry
Guinea-Bissau|Africa|Bissau
Ivory Coast|Africa|Yamoussoukro|Côte d'Ivoire
Kenya|Africa|Nairobi
Lesotho|Africa|Maseru
Liberia|Africa|Monrovia
Libya|Africa|Tripoli
Madagascar|Africa|Antananarivo
Malawi|Africa|Lilongwe
Mali|Africa|Bamako
Mauritania|Africa|Nouakchott
Mauritius|Africa|Port Louis
Morocco|Africa|Rabat
Mozambique|Africa|Maputo
Namibia|Africa|Windhoek
Niger|Africa|Niamey
Nigeria|Africa|Abuja
Rwanda|Africa|Kigali
Sao Tome and Principe|Africa|São Tomé
Senegal|Africa|Dakar
Seychelles|Africa|Victoria
Sierra Leone|Africa|Freetown
Somalia|Africa|Mogadishu
South Africa|Africa|Pretoria
South Sudan|Africa|Juba
Sudan|Africa|Khartoum
Tanzania|Africa|Dodoma
Togo|Africa|Lomé
Tunisia|Africa|Tunis
Uganda|Africa|Kampala
Zambia|Africa|Lusaka
Zimbabwe|Africa|Harare
Afghanistan|Asia|Kabul
Armenia|Asia|Yerevan
Azerbaijan|Asia|Baku
Bahrain|Asia|Manama
Bangladesh|Asia|Dhaka
Bhutan|Asia|Thimphu
Brunei|Asia|Bandar Seri Begawan
Cambodia|Asia|Phnom Penh
China|Asia|Beijing
Georgia|Asia|Tbilisi
India|Asia|New Delhi
Indonesia|Asia|Jakarta
Iran|Asia|Tehran
Iraq|Asia|Baghdad
Israel|Asia|Jerusalem
Japan|Asia|Tokyo
Jordan|Asia|Amman
Kazakhstan|Asia|Astana
Kuwait|Asia|Kuwait City
Kyrgyzstan|Asia|Bishkek
Laos|Asia|Vientiane
Lebanon|Asia|Beirut
Malaysia|Asia|Kuala Lumpur
Maldives|Asia|Malé
Mongolia|Asia|Ulaanbaatar
Myanmar|Asia|Naypyidaw|Burma
Nepal|Asia|Kathmandu
North Korea|Asia|Pyongyang
Oman|Asia|Muscat
Pakistan|Asia|Islamabad
Philippines|Asia|Manila
Qatar|Asia|Doha
Saudi Arabia|Asia|Riyadh
Singapore|Asia|Singapore
South Korea|Asia|Seoul
Sri Lanka|Asia|Sri Jayawardenepura Kotte
Syria|Asia|Damascus
Tajikistan|Asia|Dushanbe
Thailand|Asia|Bangkok
Timor-Leste|Asia|Dili|East Timor
Turkey|Asia|Ankara|Türkiye
Turkmenistan|Asia|Ashgabat
United Arab Emirates|Asia|Abu Dhabi|UAE
Uzbekistan|Asia|Tashkent
Vietnam|Asia|Hanoi
Yemen|Asia|Sana'a
Albania|Europe|Tirana
Andorra|Europe|Andorra la Vella
Austria|Europe|Vienna
Belarus|Europe|Minsk
Belgium|Europe|Brussels
Bosnia and Herzegovina|Europe|Sarajevo|Bosnia
Bulgaria|Europe|Sofia
Croatia|Europe|Zagreb
Cyprus|Europe|Nicosia
Czechia|Europe|Prague|Czech Republic
Denmark|Europe|Copenhagen
Estonia|Europe|Tallinn
Finland|Europe|Helsinki
France|Europe|Paris
Germany|Europe|Berlin
Greece|Europe|Athens
Hungary|Europe|Budapest
Iceland|Europe|Reykjavik
Ireland|Europe|Dublin
Italy|Europe|Rome
Latvia|Europe|Riga
Liechtenstein|Europe|Vaduz
Lithuania|Europe|Vilnius
Luxembourg|Europe|Luxembourg
Malta|Europe|Valletta
Moldova|Europe|Chișinău
Monaco|Europe|Monaco
Montenegro|Europe|Podgorica
Netherlands|Europe|Amsterdam|Holland
North Macedonia|Europe|Skopje|Macedonia
Norway|Europe|Oslo
Poland|Europe|Warsaw
Portugal|Europe|Lisbon
Romania|Europe|Bucharest
Russia|Europe|Moscow
San Marino|Europe|San Marino
Serbia|Europe|Belgrade
Slovakia|Europe|Bratislava
Slovenia|Europe|Ljubljana
Spain|Europe|Madrid
Sweden|Europe|Stockholm
Switzerland|Europe|Bern
Ukraine|Europe|Kyiv
United Kingdom|Europe|London|UK,Britain,Great Britain
Antigua and Barbuda|North America|St. John's|Antigua
Bahamas|North America|Nassau|The Bahamas
Barbados|North America|Bridgetown
Belize|North America|Belmopan
Canada|North America|Ottawa
Costa Rica|North America|San José
Cuba|North America|Havana
Dominica|North America|Roseau
Dominican Republic|North America|Santo Domingo
El Salvador|North America|San Salvador
Grenada|North America|St. George's
Guatemala|North America|Guatemala City
Haiti|North America|Port-au-Prince
Honduras|North America|Tegucigalpa
Jamaica|North America|Kingston
Mexico|North America|Mexico City
Nicaragua|North America|Managua
Panama|North America|Panama City
Saint Kitts and Nevis|North America|Basseterre|St Kitts
Saint Lucia|North America|Castries|St Lucia
Saint Vincent and the Grenadines|North America|Kingstown|St Vincent
Trinidad and Tobago|North America|Port of Spain|Trinidad
United States|North America|Washington, D.C.|USA,US,America,United States of America
Argentina|South America|Buenos Aires
Bolivia|South America|Sucre
Brazil|South America|Brasília
Chile|South America|Santiago
Colombia|South America|Bogotá
Ecuador|South America|Quito
Guyana|South America|Georgetown
Paraguay|South America|Asunción
Peru|South America|Lima
Suriname|South America|Paramaribo
Uruguay|South America|Montevideo
Venezuela|South America|Caracas
Australia|Oceania|Canberra
Fiji|Oceania|Suva
Kiribati|Oceania|Tarawa
Marshall Islands|Oceania|Majuro
Micronesia|Oceania|Palikir
Nauru|Oceania|Yaren
New Zealand|Oceania|Wellington
Palau|Oceania|Ngerulmud
Papua New Guinea|Oceania|Port Moresby
Samoa|Oceania|Apia
Solomon Islands|Oceania|Honiara
Tonga|Oceania|Nuku'alofa
Tuvalu|Oceania|Funafuti
Vanuatu|Oceania|Port Vila
`;

const COUNTRIES = RAW.trim().split("\n").map(line => {
  const [name, continent, capital, aliases] = line.split("|");
  return { name, continent, capital, aliases: aliases ? aliases.split(",") : undefined };
});

const CONTINENTS = [...new Set(COUNTRIES.map(c => c.continent))];
const key = continent => continent.replace(" ", "").toLowerCase(); // the CSS colour: --northamerica

const GAME = {
  id: "countriesquiz", // localStorage key
  title: "Guess the Countries!",
  placeholder: "Type a country…",
  noun: "country", nouns: "countries", verb: "found",
  cheers: ["Well travelled!", "You got it!", "Super!", "Bon voyage!", "Great job!", "Wow, nice one!"],
  items: COUNTRIES,
  doneStyle: c => `--c1:var(--${key(c.continent)})`,
  filters: CONTINENTS.map(k => ({ label: k, color: `var(--${key(k)})`, test: c => c.continent === k })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "continent", label: "🌍 Continent", title: "Reveal the continent", reveal: c => chip(c.continent, `var(--${key(c.continent)})`) },
    { id: "capital", label: "🏛️ Capital", title: "Reveal the capital city", reveal: c => chip(c.capital) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
