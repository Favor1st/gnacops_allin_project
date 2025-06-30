
export const regionsData = {
  "greater-accra": {
    name: "Greater Accra",
    districts: [
      "Accra Metropolitan",
      "Tema Metropolitan",
      "Ga East Municipal",
      "Ga West Municipal",
      "Ga Central Municipal",
      "Ga South Municipal",
      "Adenta Municipal",
      "Ashaiman Municipal",
      "Ledzokuku Municipal",
      "Kpone-Katamanso Municipal",
      "La Nkwantanang Madina Municipal",
      "La Dade Kotopon Municipal",
      "Ablekuma Central Municipal",
      "Ablekuma North Municipal",
      "Ablekuma West Municipal",
      "Ayawaso Central Municipal",
      "Ayawaso East Municipal",
      "Ayawaso North Municipal",
      "Ayawaso West Wuogon Municipal",
      "Okaikwei North Municipal"
    ]
  },
  "ashanti": {
    name: "Ashanti",
    districts: [
      "Kumasi Metropolitan",
      "Obuasi Municipal",
      "Ejisu Municipal",
      "Asante Akim Central Municipal",
      "Asante Akim North Municipal",
      "Asante Akim South Municipal",
      "Bekwai Municipal",
      "Bosome Freho",
      "Bosomtwe",
      "Atwima Kwanwoma",
      "Atwima Mponua",
      "Atwima Nwabiagya Municipal",
      "Atwima Nwabiagya North Municipal"
    ]
  },
  "western": {
    name: "Western",
    districts: [
      "Sekondi-Takoradi Metropolitan",
      "Shama",
      "Ahanta West Municipal",
      "Nzema East Municipal",
      "Ellembelle",
      "Evalue Ajomoro Gwira",
      "Jomoro Municipal",
      "Tarkwa Nsuaem Municipal",
      "Prestea Huni Valley Municipal",
      "Wassa East",
      "Wassa Amenfi Central Municipal",
      "Wassa Amenfi East Municipal",
      "Wassa Amenfi West Municipal"
    ]
  },
  "central": {
    name: "Central",
    districts: [
      "Cape Coast Metropolitan",
      "Komenda Edina Eguafo Abre Municipal",
      "Abura Asebu Kwamankese",
      "Mfantsiman Municipal",
      "Ekumfi",
      "Ajumako Enyan Essiam",
      "Gomoa Central",
      "Gomoa East",
      "Gomoa West Municipal",
      "Effutu Municipal",
      "Awutu Senya East Municipal",
      "Awutu Senya West",
      "Agona East",
      "Agona West Municipal",
      "Assin Central Municipal",
      "Assin North Municipal",
      "Assin South",
      "Twifo Ati Mokwa",
      "Twifo Heman Lower Denkyira",
      "Upper Denkyira East Municipal",
      "Upper Denkyira West"
    ]
  },
  "eastern": {
    name: "Eastern",
    districts: [
      "New Juaben Municipal",
      "New Juaben South Municipal",
      "Nsawam Adoagyiri Municipal",
      "Suhum Municipal",
      "Akuapim North Municipal",
      "Akuapim South Municipal",
      "Yilo Krobo Municipal",
      "Lower Manya Krobo Municipal",
      "Upper Manya Krobo",
      "Asuogyaman",
      "West Akim Municipal",
      "East Akim Municipal",
      "Atiwa East",
      "Atiwa West",
      "Fanteakwa North",
      "Fanteakwa South",
      "Kwaebibirem Municipal",
      "Denkyembour",
      "Kwahu East",
      "Kwahu South",
      "Kwahu West Municipal",
      "Kwahu Afram Plains North",
      "Kwahu Afram Plains South",
      "Upper West Akim",
      "Okere",
      "Akyemansa"
    ]
  },
  "volta": {
    name: "Volta",
    districts: [
      "Ho Municipal",
      "Hohoe Municipal",
      "Keta Municipal",
      "Anloga",
      "South Tongu",
      "North Tongu",
      "Central Tongu",
      "Akatsi North",
      "Akatsi South Municipal",
      "Ketu North Municipal",
      "Ketu South Municipal",
      "Adaklu",
      "Ho West",
      "Afadjato South",
      "Ve Golokwati",
      "North Dayi",
      "South Dayi",
      "Jasikan",
      "Kadjebi",
      "Krachi East Municipal",
      "Krachi West",
      "Krachi Nchumuru",
      "Nkwanta North",
      "Nkwanta South Municipal",
      "Biakoye"
    ]
  },
  "northern": {
    name: "Northern",
    districts: [
      "Tamale Metropolitan",
      "Sagnarigu Municipal",
      "Savelugu Municipal",
      "Nanton Municipal",
      "Kumbungu",
      "Tolon",
      "Zabzugu",
      "Tatale Sanguli",
      "Yendi Municipal",
      "Mion",
      "Gushegu Municipal",
      "Karaga",
      "Mamprugu Moagduri",
      "Chereponi",
      "Saboba",
      "East Mamprusi Municipal",
      "West Mamprusi Municipal",
      "Bunkpurugu Nakpanduri"
    ]
  },
  "upper-east": {
    name: "Upper East",
    districts: [
      "Bolgatanga Municipal",
      "Talensi",
      "Nabdam",
      "Builsa North Municipal",
      "Builsa South",
      "Kassena Nankana Municipal",
      "Kassena Nankana West",
      "Bawku Municipal",
      "Bawku West",
      "Pusiga",
      "Garu",
      "Tempane",
      "Binduri"
    ]
  },
  "upper-west": {
    name: "Upper West",
    districts: [
      "Wa Municipal",
      "Wa East",
      "Wa West",
      "Nadowli Kaleo",
      "Daffiama Bussie Issa",
      "Sissala East Municipal",
      "Sissala West",
      "Jirapa Municipal",
      "Lambussie Karni",
      "Lawra Municipal",
      "Nandom Municipal"
    ]
  },
  "brong-ahafo": {
    name: "Bono",
    districts: [
      "Sunyani Municipal",
      "Sunyani West",
      "Berekum Municipal",
      "Dormaa Central Municipal",
      "Dormaa East",
      "Dormaa West",
      "Jaman North",
      "Jaman South Municipal",
      "Tain",
      "Wenchi Municipal",
      "Techiman Municipal",
      "Techiman North",
      "Nkoranza North",
      "Nkoranza South Municipal",
      "Kintampo North Municipal",
      "Kintampo South",
      "Atebubu Amantin Municipal",
      "Sene East",
      "Sene West",
      "Pru East",
      "Pru West"
    ]
  }
};

export const getRegions = () => {
  return Object.entries(regionsData).map(([key, value]) => ({
    value: key,
    label: value.name
  }));
};

export const getDistricts = (regionKey: string) => {
  const region = regionsData[regionKey as keyof typeof regionsData];
  return region ? region.districts.map(district => ({
    value: district.toLowerCase().replace(/\s+/g, '-'),
    label: district
  })) : [];
};
